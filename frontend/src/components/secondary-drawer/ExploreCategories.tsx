import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import useCRUD from '../../hooks/useCrud';


interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ExploreCategories = () => {
  const { fetchData, dataCRUD, error, isLoading } = useCRUD<Category>([], "/server/select/?category/");

  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: 2, borderBottom: `1px solid ${theme.palette.divider}`, position: "sticky", top: 0, backgroundColor: theme.palette.background.default }}>
    </Box>
  );
};

export default ExploreCategories;