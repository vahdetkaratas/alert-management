import axios from 'axios';

// Base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getAlerts = async () => {
  const response = await API.get('/alerts');
  return response.data;
};

export const getAlertById = async (id: number) => {
  const response = await API.get(`/alerts/${id}`);
  return response.data;
};

export const createAlert = async (data: FormData) => {
  const response = await API.post('/alerts', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateAlert = async (id: number, data: { name: string; age: number }) => {
  const response = await API.put(`/alerts/${id}`, data);
  return response.data;
};

export const deleteAlert = async (id: number) => {
  await API.delete(`/alerts/${id}`);
};
