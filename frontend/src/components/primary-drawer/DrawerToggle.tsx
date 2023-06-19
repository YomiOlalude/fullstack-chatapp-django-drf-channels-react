import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClosed: () => void;
};

const DrawerToggle: React.FC<Props> = ({
  open,
  handleDrawerOpen,
  handleDrawerClosed,
}) => {
  return (
    <Box
      sx={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={open ? handleDrawerClosed : handleDrawerOpen}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
