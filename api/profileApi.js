import axios from 'axios';
const BASE_URL = 'http://192.168.1.14:5000/api/profiles';

export const createUserProfile = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/create-profile`, userData);
    console.log('Response:', response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error('Error in createUserProfile:', error.response ? error.response.data : error.message);
    throw error; // Rethrow error to handle it where function is called
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

export const updateUserProfile = async (userId, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${userId}`, updatedData);
  return response.data;
};

export const userLogin = async (email,password)=>{
  const response = await axios.post('${BASE_URL}/create-profile', )
}