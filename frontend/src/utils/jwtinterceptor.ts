import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../data/config';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({baseURL: API_BASE_URL});
  const navigate = useNavigate();
  const user = useContext(AuthContext)

  axios.defaults.withCredentials = true;

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const errorCodes = [401, 403];

      if (errorCodes.includes(error?.response?.status)) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            withCredentials: true,
          });

          if (response['status'] === 200) {
            return jwtAxios(originalRequest);
          }
        } catch (error) {
          user?.logout()
          console.log(error);
          navigate('/login');
          return Promise.reject(error);
        }
      }

      throw error;
    }
  );

  return jwtAxios;
};

export default useAxiosWithInterceptor;
