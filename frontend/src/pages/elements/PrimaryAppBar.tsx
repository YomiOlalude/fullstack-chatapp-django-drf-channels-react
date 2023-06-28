import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ExploreCategories from '../../components/secondary-drawer/ExploreCategories';
import AccountButton from '../../components/primary-app-bar/AccountButton';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const theme = useTheme();
  const user = useContext(AuthContext)

  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = () => {
    setSideMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [sideMenu, isSmallScreen]);

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={sideMenu}
          onClose={() => setSideMenu(false)}
        >
          {list()}
        </Drawer>

        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}
          >
            MOOD
          </Typography>
        </Link>
        <button onClick={() => user?.logout()}>Logout</button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
