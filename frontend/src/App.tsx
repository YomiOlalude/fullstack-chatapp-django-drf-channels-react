import { Route, Routes } from 'react-router-dom';
import MembershipCheck from './components/membership/MembershipCheck';
import AuthContextProvider from './context/AuthContext';
import MembershipContextProvider from './context/MembershipContext';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Server from './pages/Server';
import SignUp from './pages/SignUp';
import ToggleColorMode from './pages/elements/ToggleColorMode';
import ProtectedRoute from './services/ProtectedRoute';

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
                  <MembershipContextProvider>
                    <MembershipCheck>
                      <Server />
                    </MembershipCheck>
                  </MembershipContextProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ToggleColorMode>
      </AuthContextProvider>
    </>
  );
}

export default App;
