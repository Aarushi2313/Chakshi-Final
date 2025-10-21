import axios from 'axios';
import { supabase } from '../lib/supabase';

// API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get current session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error getting session:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the session
        const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError || !session) {
          // Session refresh failed, redirect to login
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  // Register new user with backend
  register: async (token, role, name) => {
    try {
      const response = await api.post('/auth/register', { token, role, name });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.response?.data?.message || error.message || 'Registration failed' 
      };
    }
  },

  // Login user with backend
  login: async (token) => {
    try {
      const response = await api.post('/auth/login', { token });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await api.post('/auth/verify-token', { token });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.response?.data?.message || error.message || 'Token verification failed' 
      };
    }
  },

  // Get current user from backend
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.response?.data?.message || error.message || 'Failed to get user' 
      };
    }
  },
};

// Cases API
export const casesAPI = {
  getAll: async () => {
    const response = await api.get('/cases');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },
  
  create: async (caseData) => {
    const response = await api.post('/cases', caseData);
    return response.data;
  },
  
  update: async (id, caseData) => {
    const response = await api.put(`/cases/${id}`, caseData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/cases/${id}`);
    return response.data;
  },
};

// Clients API
export const clientsAPI = {
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },
  
  create: async (clientData) => {
    const response = await api.post('/clients', clientData);
    return response.data;
  },
  
  update: async (id, clientData) => {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
};

// Documents API
export const documentsAPI = {
  getAll: async () => {
    const response = await api.get('/documents');
    return response.data;
  },
  
  upload: async (formData) => {
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },
};

// Schedule API
export const scheduleAPI = {
  getAll: async () => {
    const response = await api.get('/schedule');
    return response.data;
  },
  
  create: async (scheduleData) => {
    const response = await api.post('/schedule', scheduleData);
    return response.data;
  },
  
  update: async (id, scheduleData) => {
    const response = await api.put(`/schedule/${id}`, scheduleData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/schedule/${id}`);
    return response.data;
  },
};

export default api;
