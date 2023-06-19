import { Box, CssBaseline } from '@mui/material';
import PopularChannels from '../components/primary-drawer/PopularChannels';
import Main from './elements/Main';
import PrimaryAppBar from './elements/PrimaryAppBar';
import PrimaryDrawer from './elements/PrimaryDrawer';
import SecondaryDrawer from './elements/SecondaryDrawer';
import ExploreCategories from '../components/secondary-drawer/ExploreCategories';
import ExploreServers from '../components/main/ExploreServers';

const Explore = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          <PopularChannels open={false} />
        </PrimaryDrawer>
        <SecondaryDrawer>
          <ExploreCategories />
        </SecondaryDrawer>
        <Main>
          <ExploreServers />
        </Main>
      </Box>
    </>
  );
};

export default Explore;
