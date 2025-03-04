import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { getUserProfile, createUserProfile, updateUserProfile } from '../api/profileApi'; // ✅ Import API functions
import Card from '../components/CardComponent';

export default function ProfileCreationScreen() {
  const userId = 'USER_ID_HERE'; // Replace with actual user ID from auth
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    bio: '',
    skills: '',
    learningGoals: '',
    rating: 5,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile(userId);
        if (userData) {
          setUser(userData);
          setFormData({
            name: userData.name,
            email: userData.email,
            profilePicture: userData.profilePicture || '',
            bio: userData.bio || '',
            skills: userData.skills.join(', '),
            learningGoals: userData.learningGoals.join(', '),
            rating: userData.rating || 5,
          });
          setIsNewUser(false);
        } else {
          setIsNewUser(true);
        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
        setIsNewUser(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveOrUpdate = async () => {
    const userData = {
      name: formData.name,
      email: formData.email,
      profilePicture: formData.profilePicture || '',
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()),
      learningGoals: formData.learningGoals.split(',').map(s => s.trim()),
      rating: formData.rating,
    };

    console.log('📌 User Data to Send:', userData);

    if (isNewUser) {
      const createdUser = await createUserProfile(userData);
      console.log('✅ Created User:', createdUser);
      if (createdUser) {
        setUser(createdUser);
        setIsNewUser(false);
      }
    } else {
      const updatedUser = await updateUserProfile(userId, userData);
      console.log('✅ Updated User:', updatedUser);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: formData.profilePicture || 'https://via.placeholder.com/100',
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Name"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
      style={styles.inputContainer}
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      <TextInput
      style={styles.inputContainer}
        placeholder="Bio"
        value={formData.bio}
        onChangeText={text => handleInputChange('bio', text)}
      />
      <TextInput
      style={styles.inputContainer}
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChangeText={text => handleInputChange('skills', text)}
      />
      <TextInput
      style={styles.inputContainer}
        placeholder="Learning Goals (comma-separated)"
        value={formData.learningGoals}
        onChangeText={text => handleInputChange('learningGoals', text)}
      />
      <TextInput
      style={styles.inputContainer}
        placeholder="Rating"
        value={formData.rating.toString()}
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
  container: {
    flex: 1,
  },
  input: {flex: 1, fontSize: 16},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '95%',
    marginStart: 10,
    marginRight: 10,
    fontSize: 18
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginStart: 30,
    marginRight: 30,
  },
  button: {
    backgroundColor: '#0492c2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
