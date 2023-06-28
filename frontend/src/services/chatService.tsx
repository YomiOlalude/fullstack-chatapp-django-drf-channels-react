import { useContext, useEffect, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { Server } from '../@types/server';
import { AuthContext } from '../context/AuthContext';
import { WS_ROOT } from '../data/config';
import useCRUD from '../hooks/useCrud';

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const useChatWebSocket = (channelId: string, serverId: string) => {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [sentNewMessage, setSentNewMessage] = useState<boolean>(false);

  const user = useContext(AuthContext);
  const { fetchData } = useCRUD<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketURL = channelId ? `${WS_ROOT}/${serverId}/${channelId}/` : null;

  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConnectionAttempts = 4;

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.log('%cConnected', 'color: #90EE90');
      } catch (error) {
        console.error(error);
      }
    },
    onClose: (event: CloseEvent) => {
      if (event.code === 4001) {
        console.log('%cAuthentication error', 'color: red');

        user?.refreshAccessToken().catch((error: any) => {
          if (error.response && error.response.status === 401) {
            user?.logout();
          }
        });
      }
      console.log('%cClosed', 'color: red');
      setSentNewMessage(false);
      setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
    },
    onError: (error) => {
      console.error(error);
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prevMsg) => [...prevMsg, data.new_message]);
      setSentNewMessage(true);
      setMessage('');
    },
    shouldReconnect: (closeEvent) => {
      if (
        closeEvent.code === 4001 &&
        reconnectionAttempt >= maxConnectionAttempts
      ) {
        setReconnectionAttempt(0);
        return false;
      }
      return true;
    },
    reconnectInterval: 5000,
  });

  return {
    message,
    newMessage,
    sentNewMessage,
    setMessage,
    sendJsonMessage,
  };
};

export default useChatWebSocket;
