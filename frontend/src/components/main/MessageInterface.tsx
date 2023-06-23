import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { Server } from '../../@types/server';
import useCRUD from '../../hooks/useCrud';
import MessageInterfaceChannels from './MessageInterfaceChannels';
import Scroll from './Scroll';

interface ServerChannelProps {
  data: Server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

const MessageInterface = ({ data }: ServerChannelProps) => {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const { serverId, channelId } = useParams();
  const { fetchData } = useCRUD<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const theme = useTheme();
  const serverName = data?.[0]?.name ?? 'Server';

  const socketURL = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}/`
    : null;

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.info('%cConnected', 'color: #90EE90');
      } catch (error) {
        console.log(error);
      }
    },
    onClose: () => {
      console.log('closed');
    },
    onError: (error) => {
      console.error(error);
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prevMsg) => [...prevMsg, data.new_message]);
      setMessage('');
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      sendJsonMessage({
        type: 'message',
        message,
      } as SendMessageData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: 'message',
      message,
    } as SendMessageData);
  };

  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = `${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;

    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <>
      <MessageInterfaceChannels data={data} />

      {channelId === undefined ? (
        <Box
          sx={{
            overflow: 'hidden',
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={'-0.5px'}
              sx={{ px: 5, maxWidth: '600px' }}
            >
              Welcome to {serverName}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? 'This is our Home'}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ overflow: 'hidden', p: 0, height: `calc(100vh - 190px)` }}>
            <Scroll>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {newMessage.map((msg: Message, index: number) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="User image" />
                    </ListItemAvatar>

                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '12px',
                        variant: 'body2',
                      }}
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: 'inline', fontWeight: 600 }}
                          >
                            {msg.sender}

                            <Typography
                              component="span"
                              variant="caption"
                              color="textSecondary"
                            >
                              {' on '}
                              {formatTimeStamp(msg.timestamp)}
                            </Typography>
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body1"
                            style={{
                              overflow: 'visible',
                              whiteSpace: 'normal',
                              textOverflow: 'clip',
                            }}
                            sx={{
                              display: 'inline',
                              lineHeight: 1.2,
                              fontWeight: 400,
                              letterSpacing: '-0.2px',
                            }}
                            color="text.primary"
                            component="span"
                          >
                            {msg.content}
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </Scroll>
          </Box>

          <Box sx={{ position: 'sticky', bottom: 0, width: '100%' }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: '1rem',
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  multiline
                  value={message}
                  minRows={1}
                  maxRows={4}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
