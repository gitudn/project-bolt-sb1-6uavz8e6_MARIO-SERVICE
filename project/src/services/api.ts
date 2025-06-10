import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request. Please try again.');
    }
  }
);

export const submitQuote = async (formData: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  privacy: boolean;
}) => {
  try {
    const { privacy, ...rest } = formData;
    const response = await api.post('/quotes', {
      ...rest,
      privacy_consent: privacy ? 'allowed' : 'not allowed'
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error submitting quote');
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error during login');
  }
};

interface FetchQuotesParams {
  status?: string;
  service?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
  dateRange?: string;
}

export const fetchQuotes = async (params: FetchQuotesParams = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Only add parameters that are defined and not 'Any'
    if (params.status && params.status !== 'Any') {
      queryParams.append('status', params.status);
    }
    if (params.service && params.service !== 'Any') {
      queryParams.append('service', params.service);
    }
    if (params.searchQuery) {
      queryParams.append('search', params.searchQuery);
    }
    if (params.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params.dateRange) {
      queryParams.append('dateRange', params.dateRange);
    }

    const queryString = queryParams.toString();
    const response = await api.get(`/quotes${queryString ? `?${queryString}` : ''}`);
    
    return {
      quotes: response.data.quotes || response.data,
      total: response.data.total || response.data.length,
      page: response.data.page || 1,
      totalPages: response.data.totalPages || 1
    };
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching quotes');
  }
};

export const updateQuoteStatus = async (quoteId: string, status: string) => {
  try {
    const response = await api.patch(`/quotes/${quoteId}/status`, { status });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error updating quote status');
  }
};

export const deleteQuote = async (quoteId: string) => {
  try {
    const response = await api.delete(`/quotes/${quoteId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error deleting quote');
  }
};

export const bulkDeleteQuotes = async (quoteIds: string[]) => {
  try {
    const response = await api.delete('/quotes/bulk', { data: { ids: quoteIds } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error deleting quotes');
  }
};

export const bulkUpdateQuoteStatus = async (quoteIds: string[], status: string) => {
  try {
    const response = await api.patch('/quotes/bulk/status', { ids: quoteIds, status });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error updating quotes status');
  }
}; 