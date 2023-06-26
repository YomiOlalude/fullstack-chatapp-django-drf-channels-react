import axios from 'axios';
import React, { createContext, useState } from 'react';
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

      setIsAuthenticated(true);
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
    }
  };

  const logout = async () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.setItem('is_authenticated', 'false');
    setIsAuthenticated(false);
  };

  const authServices = { login, logout, isAuthenticated };

  return (
    <AuthContext.Provider value={authServices}>{children}</AuthContext.Provider>
  );
}
