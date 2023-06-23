import { Box, useTheme } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../config';

type SecondaryDrawerProps = {
  children: React.ReactNode;
};

const SecondaryDrawer = ({ children }: SecondaryDrawerProps) => {
  const theme = useTheme();

  axios
    .get(`${BASE_URL}/server/select/?category=Drama`)
    .then((response) => response)
    .catch((error) => console.error(error.message));

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDrawer.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: 'none', sm: 'block' },
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export default SecondaryDrawer;
