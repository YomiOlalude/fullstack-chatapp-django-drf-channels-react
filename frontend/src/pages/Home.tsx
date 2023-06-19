import { Box, CssBaseline } from '@mui/material';
import PopularChannels from '../components/primary-drawer/PopularChannels';
import Main from './elements/Main';
import PrimaryAppBar from './elements/PrimaryAppBar';
import PrimaryDrawer from './elements/PrimaryDrawer';
import SecondaryDrawer from './elements/SecondaryDrawer';


const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          <PopularChannels />
        </PrimaryDrawer>
        <SecondaryDrawer />
        <Main />
      </Box>
    </>
  );
};

export default Home;
