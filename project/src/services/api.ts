import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitQuote = async (formData: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}) => {
  try {
    const response = await api.post('/quotes', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error submitting quote');
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error during login');
  }
};

export const fetchQuotes = async (token: string) => {
  try {
    const response = await api.get('/quotes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching quotes');
  }
};

export const updateQuoteStatus = async (
  quoteId: string,
  status: string,
  token: string
) => {
  try {
    const response = await api.patch(
      `/quotes/${quoteId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error updating quote status');
  }
}; 