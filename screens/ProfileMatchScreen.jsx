import React, {useState} from 'react';
import {getUserProfile} from '../api/profileApi';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileMatchScreen = () => {
  const [skillEntered, setSkillEntered] = useState('');

  const handleInputChange = (field, value) => {
    console.log('SkillEntered: ', skillEntered);
    setSkillEntered({...skillEntered, [field]: value});
  };

  function fetchId(){
  // const fetchProfile = async id => {
    try {
      const userData = AsyncStorage.getItem('userId');
      // const userId = getUserProfile(id)
      console.log('User Id Found:', userData);
    } catch (error) {
      console.log('No User Id Found..');
    }
  // };
}

  return (
    <SafeAreaView>
      <ScrollView>
        <View >
        {/* <Icon name="user-o" size={24} color="#36454f" style={styles.icon} onPress={fetchId} /> */}
          <TextInput
            style={styles.inputContainer}
            placeholder="Name"
            value={skillEntered}
            onChangeText={text =>
              handleInputChange('skills', text)
            }></TextInput>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
  },
});

export default ProfileMatchScreen;
