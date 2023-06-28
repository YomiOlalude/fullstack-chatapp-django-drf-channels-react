import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MembershipContext } from '../../context/MembershipContext';

const JoinServerButton = () => {
  const membership = useContext(MembershipContext);
  const { serverId } = useParams();

  const handleLeaveServer = async () => {
    try {
      await membership?.leaveServer(Number(serverId))
      console.info("User has left the server")
    } catch (error) {
      console.error("Error leaving the server")
    }
  }

  const handleJoinServer = async () => {
    try {
      await membership?.joinServer(Number(serverId))
      console.info("User has joned the server")
    } catch (error) {
      console.error("Error joining the server")
    }
  }

  if (membership?.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {membership?.isUserMember ? (
        <button onClick={handleLeaveServer}>Leave Server</button>
      ) : (
        <button onClick={handleJoinServer}>Join Server</button>
      )}
    </>
  )
};

export default JoinServerButton;
