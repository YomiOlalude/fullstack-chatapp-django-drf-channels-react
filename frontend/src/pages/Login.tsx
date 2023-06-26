import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const res = await user?.login(username, password);

      if (res) {
        navigate('/testlogin');
      }
    },
  });

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
        />

        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
