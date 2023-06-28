export interface MemberServiceProps {
  joinServer: (serverId: number) => any;
  leaveServer: (serverId: number) => any;
  isMember: (serverId: number) => any;
  isUserMember: boolean;
  error: Error | null;
  isLoading: boolean;
}
