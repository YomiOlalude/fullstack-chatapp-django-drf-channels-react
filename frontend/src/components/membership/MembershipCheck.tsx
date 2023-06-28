import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MembershipContext } from '../../context/MembershipContext';

interface MembershipCheckProps {
  children: any;
}

const MembershipCheck: React.FC<MembershipCheckProps> = ({ children }) => {
  const membership = useContext(MembershipContext);
  const { serverId } = useParams();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await membership?.isMember(Number(serverId));
      } catch (error) {
        console.error('Error checking membership status', error);
      }
    };

    checkMembership();
  }, [serverId]);
  
  return <>{children}</>;
};

export default MembershipCheck;
