import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Server from '../../pages/Server';

interface ServerChannelsProps {
  data: Server[];
}

const ServerChannels: React.FC< ServerChannelsProps> = ({ data }) => {
  const theme = useTheme();
  const serverName = data?.[0]?.name ?? 'Server';
  const { serverId } = useParams();

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
          top: 1,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
          }}
        >
          {serverName}
        </Typography>
      </Box>

      <List sx={{ py: 0 }}>
        {data.flatMap((obj) =>
          obj.channels.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              sx={{ display: 'block', maxHeight: '40px' }}
              dense={true}
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
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
          ))
        )}
      </List>
    </>
  );
};

export default ServerChannels;
