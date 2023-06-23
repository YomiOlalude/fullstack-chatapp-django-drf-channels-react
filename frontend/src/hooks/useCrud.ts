import { useState } from 'react';
import { BASE_URL } from '../config';
import useAxiosWithInterceptor from '../helpers/jwtinterceptor';

interface IuseCRUD<T> {
  fetchData: () => Promise<void>;
  dataCRUD: T[];
  error: Error | null;
  isLoading: boolean;
}

const useCRUD = <T>(initialData: T[], apiURL: string): IuseCRUD<T> => {
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const jwtAxios = useAxiosWithInterceptor();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data
      setDataCRUD(data);
      setError(null);
      setIsLoading(false);
      return data;
    } catch (error: any) {
      if (error.response) {
        setError(new Error('400'));
      }
      setIsLoading(false);
      throw error;
    }
  };

  return { fetchData, dataCRUD, error, isLoading };
};

export default useCRUD;
