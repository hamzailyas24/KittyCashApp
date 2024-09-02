import axios from 'axios';

const API_URL = 'https://api.cashkitty.app';

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/setup?timestamp=${Date.now()}`, userData);
};

export const fetchAvailableOffers = async (requestData) => {
  return axios.post(`${API_URL}/available?timestamp=${Date.now()}`, requestData);
};