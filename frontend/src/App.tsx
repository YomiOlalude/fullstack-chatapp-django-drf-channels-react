import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import createMUITheme from './theme/theme';
import Explore from './pages/Explore';

function App() {
  const theme = createMUITheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:categoryName" element={<Explore />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
