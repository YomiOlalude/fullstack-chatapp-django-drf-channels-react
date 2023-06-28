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
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_URL } from '../../data/config';
import useCRUD from '../../hooks/useCrud';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Server {
  id: number;
  name: string;
  category: Category;
  icon: string;
}

type Props = {
  open: boolean;
};

const PopularChannels: React.FC<Props> = ({ open }) => {
  const { fetchData, dataCRUD, error, isLoading } = useCRUD<Server>(
    [],
    '/server/select/?category=music'
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          flex: '1 1 100%',
        }}
      >
        <Typography sx={{ display: open ? 'block' : 'none' }}>
          Popular
        </Typography>
      </Box>

      <List>
        {dataCRUD.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: 'block' }}
            dense={true}
          >
            <Link
              to={`/server/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  <ListItemAvatar sx={{ minWidth: '50px' }}>
                    <Avatar alt={item.name} src={`${MEDIA_URL}${item.icon}`} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: 'textSecondary',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.category.name}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PopularChannels;
