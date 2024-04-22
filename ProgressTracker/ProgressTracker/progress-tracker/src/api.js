import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getUserProgress = (userId) => {
  return axios.get(`${API_BASE_URL}/api/progress/${userId}`);
};

export const updateUserProgress = (userId, data) => {
  return axios.patch(`${API_BASE_URL}/api/progress/${userId}`, data);
};

export const createProgressEntry = (data) => {
  return axios.post(`${API_BASE_URL}/api/progress`, data);
};