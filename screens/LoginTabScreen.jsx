import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  BackHandler
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function LoginTabScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleBackPress = async () =>{
    Alert.alert("Logout", "Do you want to logout", [{
      text:"Cancel",
      onPress:()=>null,
      style:'cancel'
    },
  {text:"Exit",
    onPress:()=>BackHandler.exitApp(),
  }])
  }

   // Configure Google Sign-In
   useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: "820765875479-ntvslulbhlrdnlmfbfghi9mj8o1urmc3.apps.googleusercontent.com",
      offlineAccess: true,
    });
  
    // Add BackHandler event listener
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
  
    // Cleanup function to remove event listener when component unmounts
    return () => backHandler.remove();
  }, []); 
  

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);
  
      if (userInfo && userInfo.user) {
        Alert.alert("Success", `Welcome ${userInfo.user.name}`);
      } else {
        Alert.alert("Error", "User info not found");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Error", error.message || "Google Sign-In failed");
    }
  };
  

  // Handle Login API Call
  function handleLogin() {
    axios
      .post('http://192.168.1.14:5000/api/profiles/login-user', { email, password })
      .then(res => {
        console.log("Response Login" + res)
       
        if (res.data.status === 'Ok') {
          const { token, email } = res.data; // ✅ Extract userId
        console.log("✅ Token:", token);
        console.log("✅ User ID:", email);
          // const userId = res.data.userId; // Assume backend sends `userId`
        navigation.navigate('Dashboard', { email }); // ✅ Passing userId
        } else {
          Alert.alert('Login Failed!');
        }
      })
      .catch(error => {console.error('API Error:', error);
      Alert.alert('Login Failed!')});
  }

  function handleProfileCreation(){
    console.log("Add Task Clicked");
    navigation.navigate('Dashboard');
  }

  return (
    <View style={styles.container}>
      {/* Google Sign-In Button */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
      </View>

      <View>
      <TouchableOpacity onPress={handleProfileCreation}>
      <Icon name="plus-circle" size={48} color="#0492c2" style={styles.icon} />
      </TouchableOpacity>
          </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="user-o" size={24} color="#36454f" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#36454f" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  buttonContainer: { marginTop: 20, marginBottom: 20 },
  button: {
    backgroundColor: '#0492c2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
