import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthServiceProps } from '../@types/auth-service';
import { BASE_URL } from '../data/config';

export const AuthContext = createContext<AuthServiceProps | null>(null);

export default function AuthContextProvider({
  children,
}: React.PropsWithChildren) {
  const getInitialLoggedInValue = () => {
    const authenticated = localStorage.getItem('is_authenticated');
    return authenticated !== null && authenticated == 'true';
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getInitialLoggedInValue()
  );
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    setUserData(getUserDetails())
  }, [])

  // const getUserIdFromToken = (access: string) => {
  //   const tokenParts = access.split('.');
  //   const encodedPayload = tokenParts[1];
  //   const decodedPayload = atob(encodedPayload);
  //   const payloadData = JSON.parse(decodedPayload);
  //   const userId = payloadData?.user_id;

  //   return userId;
  // };

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem('user_id');

      const response = await axios.get(
        `${BASE_URL}/account/?user_id=${userId}`,
        { withCredentials: true }
      );

      const userDetails = response.data;
      localStorage.setItem('username', userDetails?.username);
      localStorage.setItem('is_authenticated', 'true');

      setUserData(userDetails)
      setIsAuthenticated(true);
      return response.data
    } catch (error: any) {
      setIsAuthenticated(false);
      localStorage.setItem('is_authenticated', 'false');
      console.error(error);
      return error;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/token/`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const userId = response.data.user_id;

      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_id', userId);

      setIsAuthenticated(true);

      getUserDetails();

      window.history.replaceState(null, '', '/');
      return response;
    } catch (error: any) {
      setIsAuthenticated(false);
      console.error(error);
      return error.response.status
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup/`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      
      window.history.replaceState(null, '', '/login');
      return response.status;
    } catch (error: any) {
      console.error(error);
      return error.response.status
    }
  };

  const refreshAccessToken = async () => {
    try {
      await axios.post(
        `${BASE_URL}/token/refresh/`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.setItem('is_authenticated', 'false');
    setIsAuthenticated(false);
    navigate('/login');

    try {
      await axios.post(
        `${BASE_URL}/logout/`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const authServices = { login, logout, signup, refreshAccessToken, isAuthenticated, userData };

  return (
    <AuthContext.Provider value={authServices}>{children}</AuthContext.Provider>
  );
}
