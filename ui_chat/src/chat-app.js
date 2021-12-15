import { SocketProvider } from './context/socket-context';
import { LoginPage } from './pages/login';

export const ChatApp = () => {
  return (
    <SocketProvider>
      <LoginPage />
    </SocketProvider>
  );
};
