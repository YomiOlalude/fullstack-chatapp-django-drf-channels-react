import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import createMUITheme from './theme/theme';
import { ThemeProvider } from '@mui/material';


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
  )
}

export default App
