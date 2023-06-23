import { Box, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Server } from '../@types/server';
import MessageInterface from '../components/main/MessageInterface';
import UserServers from '../components/primary-drawer/UserServers';
import ServerChannels from '../components/secondary-drawer/ServerChannels';
import useCRUD from '../hooks/useCrud';
import Main from './elements/Main';
import PrimaryAppBar from './elements/PrimaryAppBar';
import PrimaryDrawer from './elements/PrimaryDrawer';
import SecondaryDrawer from './elements/SecondaryDrawer';

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { dataCRUD, error, isLoading, fetchData } = useCRUD<Server>(
    [],
    `/server/select/?by_server_id=${serverId}`
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (error !== null && error.message === '400') {
    navigate('/');
  }

  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    }

    return dataCRUD.some((server) =>
      server.channels.some((channel) => channel.id === Number(channelId))
    );
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`)
    }
  }, [isChannel, channelId])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          <UserServers open={false} data={dataCRUD} />
        </PrimaryDrawer>
        <SecondaryDrawer>
          <ServerChannels data={dataCRUD} />
        </SecondaryDrawer>
        <Main>
          <MessageInterface data={dataCRUD} />
        </Main>
      </Box>
    </>
  );
};

export default Server;
