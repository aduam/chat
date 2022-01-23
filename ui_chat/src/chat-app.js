import { SocketProvider } from './context/socket-context';
import { AppRouter } from './router/app-router';

export const ChatApp = () => {
  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  );
};
