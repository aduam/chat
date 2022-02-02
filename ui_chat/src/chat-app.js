import dayjs from 'dayjs';

import { AppRouter } from './router/app-router';
import { AuthProvider } from './auth/auth-context';
import { SocketProvider } from './context/socket-context';
import { ChatProvider } from './context/chat/chat-context';

dayjs.locale('es');

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
