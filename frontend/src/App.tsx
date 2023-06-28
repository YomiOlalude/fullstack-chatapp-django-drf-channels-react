import { Route, Routes } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Server from './pages/Server';
import TestLogin from './pages/TestLogin';
import ToggleColorMode from './pages/elements/ToggleColorMode';
import ProtectedRoute from './services/ProtectedRoute';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <AuthContextProvider>
        <ToggleColorMode>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <Server />
                </ProtectedRoute>
              }
            />
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToggleColorMode>
      </AuthContextProvider>
    </>
  );
}

export default App;
