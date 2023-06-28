export interface AuthServiceProps {
  login: (username: string, password: string) => any;
  logout: () => any;
  signup: (username: string, password: string) => Promise<any>;
  refreshAccessToken: () => Promise<void>;
  isAuthenticated: boolean;
  userData: object;
}