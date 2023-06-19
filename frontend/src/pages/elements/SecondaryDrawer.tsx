import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";


const SecondaryDrawer = () => {
  const theme = useTheme();

  axios
    .get(`${BASE_URL}/server/select/?category=Drama`)
    .then(response => response)
    .catch(error => console.error(error.message)); 

  return (
    <Box sx={{
      minWidth: `${theme.secondaryDrawer.width}px`,
      height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
      mt: `${theme.primaryAppBar.height}px`,
      borderRight: `1 px solid ${theme.palette.divider}`,
      display: { xs: "none", sm: "block" },
      overflow: 'auto',
    }}>
      {[...Array(100)].map((_, i) => (
        <Typography key={i} paragraph>
          {i + 1}
        </Typography>
      ))}
      
    </Box>
  );
};

export default SecondaryDrawer;