import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../data/config';
import useAxiosWithInterceptor from '../utils/jwtinterceptor';

const TestLogin = () => {
  const user = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const response = await jwtAxios.get(`${BASE_URL}/account/?user_id=1`);

      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (error: any) {
      return error;
    }
  };

  return (
    <>
      <div>
        <button onClick={user?.logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details</button>
      </div>
      {user?.isAuthenticated ? 'true' : 'false'}
      {username}
    </>
  );
};

export default TestLogin;
