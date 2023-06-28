import { Box, Button, Container, TextField, Typography } from '@mui/material';
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
    validate: (values) => {
      const errors: Partial<typeof values> = {};

      if (!values.username) {
        errors.username = 'Username required';
      }

      if (!values.password) {
        errors.password = 'Password required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const status = await user?.login(username, password);

      if (status === 401) {
        console.error('Unauthorised');

        formik.setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password',
        });
      } else {
        navigate('/');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="h1"
          sx={{ fontWeight: 500, pb: 2 }}
        >
          Sign In
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          ></TextField>

          <TextField
            margin="normal"
            fullWidth
            autoFocus
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          ></TextField>

          <Button
            variant="contained"
            disableElevation
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
