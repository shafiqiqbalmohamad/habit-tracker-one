import axios from 'axios';

// You can change this base URL to your actual backend API endpoint.
const API_BASE_URL = 'https://your-api-endpoint.com/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization headers or other headers if necessary
    // For example, you can add a token from local storage if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the response body data
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Handle error response from server (e.g., 400, 404, 500)
      console.error('API error:', error.response.data);
    } else if (error.request) {
      // Handle no response received (network issues)
      console.error('Network error:', error.request);
    } else {
      // Handle any other errors
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper methods to simplify API calls
export const get = async (url: string, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (url: string, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const put = async (url: string, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const del = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
