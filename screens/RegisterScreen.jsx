import React, {useState} from 'react';
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
  }

  function handleSubmit() {
    // Validate Inputs
    const isNameValid = name.length > 1;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isMobileValid = /^\d{10}$/.test(mobile);
    const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(
      password,
    );

    if (!isNameValid || !isEmailValid || !isMobileValid || !isPasswordValid) {
      Alert.alert('Warning!!', 'Please enter valid details in all fields', [
        {text: 'OK'},
      ]);
      return;
    }

    console.log(
      'Validation States - ',
      'nameVerify:',
      isNameValid,
      'emailVerify:',
      isEmailValid,
      'mobileVerify:',
      isMobileValid,
      'passwordVerify:',
      isPasswordValid,
    );

    const userData = {name, email, mobile, password};

    axios
      .post('http://192.168.1.14:8080/register', userData)
      .then(res => {
        console.log('Response Status:', res.status);
        console.log('Response Data:', res.data);

        Alert.alert('Success', res.data.data || 'User Created Successfully', [
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ]);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Error', 'Error creating user. Please try again later.', [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({index: 0, routes: [{name: 'Register'}]}),
          },
        ]);
      });
  }

  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      <View>
        <View style={styles.action}>
          <Icon
            name="user-o"
            size={24}
            color="#36454f"
            style={styles.smallIcon2}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChange={handleName}
          />
        </View>

        <View style={styles.action}>
          <Icon
            name="mobile"
            size={24}
            color="#36454f"
            style={styles.smallIcon2}
          />
          <TextInput
            placeholder="Mobile"
            inputMode="numeric"
            maxLength={10}
            style={styles.input}
            onChange={handleMobile}
          />
        </View>

        <View style={styles.action}>
          <Icons
            name="mail"
            size={24}
            color="#36454f"
            style={styles.smallIcon2}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChange={handleEmail}
          />
        </View>

        <View style={styles.action}>
          <Icon
            name="lock"
            size={24}
            color="#36454f"
            style={styles.smallIcon2}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChange={handlePassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icons
              name={showPassword ? 'eye' : 'eye-off'}
              color={showPassword ? 'red' : 'green'}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.conditions}>
            <Icon
              name="check-circle"
              size={20}
              color="#a9a9a9"
              style={styles.smallIcon2}
            />
            <Text style={{color: '#a9a9a9'}}> At least 8 characters</Text>
          </View>
          <View style={styles.conditions}>
            <Icon
              name="check-circle"
              size={20}
              color="#a9a9a9"
              style={styles.smallIcon2}
            />
            <Text style={{color: '#a9a9a9'}}> At least 1 number</Text>
          </View>
          <View style={styles.conditions}>
            <Icon
              name="check-circle"
              size={20}
              color="#a9a9a9"
              style={styles.smallIcon2}
            />
            <Text style={{color: '#a9a9a9'}}>
              {' '}
              Both upper and lower case letters{' '}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text_header: {color: '#a9a9a9', fontWeight: 'bold', fontSize: 30},
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#a9a9a9',
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 10,
  },
  input: {flex: 1, fontSize: 16},
  buttonContainer: {marginTop: 20, marginBottom: 20},
  button: {
    backgroundColor: '#0492c2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  scrollView: {padding: 10, backgroundColor: '#f5f5f5'},
  conditions: {flexDirection: 'row', alignItems: 'flex-start', position:'relative', paddingStart:5},
});
