import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import createMUITheme from '../../theme/theme';
import ColorModeContext from '../../context/ColorModecontext';
import Cookies from 'js-cookie';

interface ToggleColorModeProps {
  children: React.ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
  const storedMode = Cookies.get('colorMode') as 'light' | 'dark';
  const preferredDarkMode = useMediaQuery("([prefers-color-scheme:dark])");
  const defaultMode = storedMode || (preferredDarkMode ? 'dark' : 'light');

  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode)

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, [mode]);

  useEffect(() => {
    Cookies.set('colorMode', mode);
  }, [mode]);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  const theme = useMemo(() => createMUITheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
};

export default ToggleColorMode;
