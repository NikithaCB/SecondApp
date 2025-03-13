import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from '../api/profileApi';

export default function ProfileCreationScreen() {
  const route = useRoute();
  // const { email: routeEmail } = route.params || {};
  // const email = route?.params?.email;


  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: route?.params?.email || '',
    profilePicture: '',
    bio: '',
    skills: '',
    learningGoals: '',
    rating: 5,
  });


  useEffect(() => {
    const fetchEmail = async () => {
      let emailFromStorage = null;
      try {
        emailFromStorage = await AsyncStorage.getItem('email');
      } catch (error) {
        console.error('❌ Error fetching email from AsyncStorage:', error);
      }
  
      const receivedEmail = route?.params?.email || emailFromStorage;
  
      if (receivedEmail) {
        setFormData(prevData => ({ ...prevData, email: receivedEmail }));
        console.log('✅ Email set successfully:', receivedEmail);
      } else {
        console.warn('⚠️ No email found in params or AsyncStorage');
      }
    };
  
    fetchEmail();
  }, []);
  
  


//   useEffect(() => {
//     if (!formData.email) {
//       const fetchEmail = async () => {
//         try {

//           console.log('📧 Email received in ProfileCreationScreen:', routeEmail);
// console.log('📧 Email in formData:', formData.email);


//           const storedEmail = await AsyncStorage.getItem('email');
//           if (storedEmail) {
//             setFormData(prevData => ({
//               ...prevData,
//               email: storedEmail, // ✅ Fallback for missing `routeEmail`
//             }));
//           }
//         } catch (error) {
//           console.error('❌ Error fetching email:', error);
//         }
//       };
  
//       fetchEmail();
//     }
//   }, []);
  
  
  

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  
  const handleSaveOrUpdate = async () => {
    const userData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()),
      learningGoals: formData.learningGoals.split(',').map(s => s.trim()),
      email: formData.email.trim(),  // ✅ Ensure no spaces or unexpected characters
    };
  
    console.log('📧 Email for update:', userData.email);
    console.log('📝 Final formData before API call:', userData);
  
    if (!userData.email) {
      Alert.alert('Error', 'Email is missing. Please try again.');
      return;
    }
  
    try {
      const existingProfile = await getUserProfile(userData.email);
  
      if (!existingProfile) {
        console.log('🆕 Creating new profile...');
        const newProfile = await createUserProfile(userData);
        console.log('✅ New Profile Created:', newProfile);
  
        if (newProfile) {
          setUser(newProfile);
          Alert.alert('Success', 'Profile created successfully!');
        }
      } else {
        console.log('🔄 Updating existing profile...');
        const updatedUser = await updateUserProfile(userData.email, userData);
        console.log('✅ Profile Updated:', updatedUser);
  
        if (updatedUser) {
          setUser(updatedUser);
          Alert.alert('Success', 'Profile updated successfully!');
        }
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };
  

  
  


  // if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: formData.profilePicture || 'https://via.placeholder.com/100',
        }}
        style={styles.profileImage}
      />
      {['name', 'bio', 'skills', 'learningGoals'].map(field => (
        <TextInput
          key={field}
          style={styles.inputContainer}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChangeText={text => handleInputChange(field, text)}
        />
      ))}

      {/* Non-editable Email Field */}
      <TextInput
        style={[styles.inputContainer, styles.disabledInput]}
        placeholder="Email"
        value={formData.email}
        editable={false}
      />

      <TextInput
        style={styles.inputContainer}
        placeholder="Rating"
        value={formData.rating.toString()}
        keyboardType="numeric"
        onChangeText={text =>
          handleInputChange('rating', parseFloat(text) || 5)
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSaveOrUpdate} style={styles.button}>
          <Text style={styles.buttonText}>
            {isNewUser ? 'Create Profile' : 'Update Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
    color: '#888',
  },
  buttonContainer: {marginTop: 20},
  button: {
    backgroundColor: '#0492c2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
