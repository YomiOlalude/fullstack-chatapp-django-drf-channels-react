import React, { createContext, useState } from 'react';
import { MemberServiceProps } from '../@types/membership';
import { BASE_URL } from '../data/config';
import useAxiosWithInterceptor from '../utils/jwtinterceptor';

export const MembershipContext = createContext<MemberServiceProps | null>(null);

export default function MembershipContextProvider({
  children,
}: React.PropsWithChildren) {
  const jwtAxios = useAxiosWithInterceptor();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserMember, setIsUserMember] = useState<boolean>(false);

  const joinServer = async (serverId: number) => {
    setIsLoading(true);

    try {
      const response = await jwtAxios.post(
        `${BASE_URL}/membership/${serverId}/membership/`,
        {},
        { withCredentials: true }
      );
      setIsLoading(false);
      setIsUserMember(true);
      return response;
    } catch (error: any) {
      setError(error);
      console.error(error);
      throw error;
    }
  };

  const leaveServer = async (serverId: number) => {
    setIsLoading(true);

    try {
      const response = await jwtAxios.delete(
        `${BASE_URL}/membership/${serverId}/membership/remove_member`
      );
      setIsLoading(false);
      setIsUserMember(false);
      return response;
    } catch (error: any) {
      setError(error);
      console.error(error);
      throw error;
    }
  };

  const isMember = async (serverId: number) => {
    setIsLoading(true);

    try {
      const response = await jwtAxios.get(
        `${BASE_URL}/membership/${serverId}/membership/is_member/`,
        { withCredentials: true }
      );
      setIsLoading(false);
      setIsUserMember(response.data.is_member);
      return response.data.is_member;
    } catch (error: any) {
      setError(error);
      setIsUserMember(false);
      console.error(error);
      throw error;
    }
  };

  const membershipServices = {
    joinServer,
    leaveServer,
    isMember,
    isUserMember,
    error,
    isLoading,
  };

  return (
    <MembershipContext.Provider value={membershipServices}>
      {children}
    </MembershipContext.Provider>
  );
}
