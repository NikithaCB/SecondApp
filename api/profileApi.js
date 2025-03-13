import axios from 'axios';
const BASE_URL = 'http://192.168.1.14:5000/api/profiles';

export const createUserProfile = async (userData) => {
  console.log('🟡 userData sent to createUserProfile:', userData);

  if (!userData.email) {
    console.error('❗ Email is missing in createUserProfile()');
    throw new Error('Email is required to create a profile.');
  }

  try {
    const response = await axios.post(`${BASE_URL}/create-profile`, userData, {
      headers: {
        'Content-Type': 'application/json'  // ✅ Ensure JSON format
      }
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error in createUserProfile:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async userId => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return null; // If user not found, return null
  }
};

export const userLogin = async (email,password)=>{
  const response = await axios.post('${BASE_URL}/create-profile', )
}

export const userRegister = async regData =>{
  try {
    const response = await axios.post(`${BASE_URL}/cr`, userData);
    console.log('Response:', response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error('Error in createUserProfile:', error.response ? error.response.data : error.message);
    throw error; // Rethrow error to handle it where function is called
  }
}

export const updateUserProfile = async (email, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-profile`, {
      email,
      ...userData
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    throw error;
  }
};