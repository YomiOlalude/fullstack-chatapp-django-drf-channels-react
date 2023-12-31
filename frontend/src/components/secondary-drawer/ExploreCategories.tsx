import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_URL } from '../../data/config';
import useCRUD from '../../hooks/useCrud';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ExploreCategories = () => {
  const { fetchData, dataCRUD } = useCRUD<Category>(
    [],
    '/server/select/?category/'
  );

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore
      </Box>

      <List sx={{ py: 0 }}>
        {dataCRUD.map((item) => (
          <ListItem
            disablePadding
            key={item.id}
            sx={{ display: 'block' }}
            dense={true}
          >
            <Link
              to={`/explore/${item.name}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  <ListItemAvatar sx={{ minWidth: '0px' }}>
                    <Avatar
                      alt={item.name}
                      src={`${MEDIA_URL}${item.icon}`}
                      style={{
                        width: '25px',
                        height: '25px',
                        display: 'block',
                        margin: 'auto',
                        filter: isDarkMode ? 'invert(100%)' : 'none',
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                      textTransform="capitalize"
                    >
                      {item.name}
                    </Typography>
                  }
                ></ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ExploreCategories;
