import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, authHelpers } from '../lib/supabase';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabaseSession, setSupabaseSession] = useState(null);

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        // Check for existing Supabase session
        const { session } = await authHelpers.getSession();
        
        if (session) {
          setSupabaseSession(session);
          
          // Try to get user data from localStorage first
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (error) {
              console.error('Error parsing saved user:', error);
              // If local data is corrupted, fetch from backend
              await fetchUserFromBackend(session.access_token);
            }
          } else {
            // No local user data, fetch from backend
            await fetchUserFromBackend(session.access_token);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSupabaseSession(session);

        if (event === 'SIGNED_IN' && session) {
          // User signed in, fetch backend data
          await fetchUserFromBackend(session.access_token);
        } else if (event === 'SIGNED_OUT') {
          // User signed out, clear state
          setUser(null);
          localStorage.removeItem('user');
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Token refreshed, update session
          setSupabaseSession(session);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch user data from backend using Supabase token
  const fetchUserFromBackend = async (token) => {
    try {
      const { data, error } = await authAPI.getCurrentUser();
      
      if (error) {
        console.error('Failed to fetch user from backend:', error);
        return null;
      }

      if (data && data.data) {
        const userData = data.data.user || data.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user from backend:', error);
      return null;
    }
  };

  // Register new user
  const register = async (email, password, role, name) => {
    try {
      setLoading(true);

      // Step 1: Sign up with Supabase
      const { data: signUpData, error: signUpError } = await authHelpers.signUp(
        email,
        password,
        { full_name: name }
      );

      if (signUpError) {
        throw new Error(signUpError.message || 'Signup failed');
      }

      if (!signUpData.session) {
        throw new Error('Please check your email to verify your account');
      }

      // Step 2: Register with backend using Supabase token
      const token = signUpData.session.access_token;
      const { data: backendData, error: backendError } = await authAPI.register(
        token,
        role.toUpperCase(),
        name
      );

      if (backendError) {
        // If backend registration fails, we should clean up Supabase user
        // For now, just throw error
        throw new Error(backendError);
      }

      // Step 3: Set user data
      const userData = backendData.data.user || backendData.data;
      setUser(userData);
      setSupabaseSession(signUpData.session);
      localStorage.setItem('user', JSON.stringify(userData));

      return { data: userData, error: null };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        data: null, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Step 1: Sign in with Supabase
      const { data: signInData, error: signInError } = await authHelpers.signIn(
        email,
        password
      );

      if (signInError) {
        throw new Error(signInError.message || 'Login failed');
      }

      if (!signInData.session) {
        throw new Error('Failed to create session');
      }

      // Step 2: Login with backend using Supabase token
      const token = signInData.session.access_token;
      const { data: backendData, error: backendError } = await authAPI.login(token);

      if (backendError) {
        // User exists in Supabase but not in backend
        // This might happen if registration was incomplete
        throw new Error(backendError);
      }

      // Step 3: Set user data
      const userData = backendData.data.user || backendData.data;
      setUser(userData);
      setSupabaseSession(signInData.session);
      localStorage.setItem('user', JSON.stringify(userData));

      return { data: userData, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        data: null, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      
      // Sign out from Supabase
      await authHelpers.signOut();
      
      // Clear local state
      setUser(null);
      setSupabaseSession(null);
      localStorage.removeItem('user');
      
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      return { error: error.message || 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    supabaseSession,
    register,
    login,
    logout,
    isAuthenticated: !!user && !!supabaseSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};