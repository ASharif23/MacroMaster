import axios from 'axios';


const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const getUserProgress = (userId) => {
  return axios.get(`${API_BASE_URL}/progress/${userId}`);
};

export const updateUserProgress = (userId, data) => {
  return axios.patch(`${API_BASE_URL}/progress/${userId}`, data);
};