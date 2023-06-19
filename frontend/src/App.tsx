import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import createMUITheme from './theme/theme';


function App() {
  const theme = createMUITheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={ <Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
