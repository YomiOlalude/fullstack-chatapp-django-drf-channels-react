import { MoreVert } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  ListItemAvatar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Server } from '../../@types/server';
import { MEDIA_URL } from '../../data/config';
import ServerChannels from '../secondary-drawer/ServerChannels';
import JoinServerButton from '../membership/JoinServerButton';

interface ServerChannelProps {
  data: Server[];
}

const MessageInterfaceChannels = ({ data }: ServerChannelProps) => {
  const [sideMenu, setSideMenu] = useState(false);

  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const channelName =
    data
      ?.find((server) => server.id == Number(serverId))
      ?.channels?.find((channel) => channel.id == Number(channelId))?.name ||
    'Home';

  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen, sideMenu]);

  const toggleDrawer = () => {
    setSideMenu((prevState) => !prevState);
  };

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <ServerChannels data={data} />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <ListItemAvatar sx={{ minWidth: '40px' }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>

          <Typography noWrap component="div">
            {channelName}
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <JoinServerButton />

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MoreVert />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageInterfaceChannels;
