import { Box, CssBaseline } from '@mui/material';
import PrimaryAppBar from './elements/PrimaryAppBar';
import PrimaryDrawer from './elements/PrimaryDrawer';


const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer />
      </Box>
    </>
  )
}

export default Home;
