import { useContext } from 'react';

import { SocketContext } from '../context/socket-context';

export const LoginPage = () => {
  const { isOnline } = useContext(SocketContext);
  return (
    <div>
      login page view is { isOnline ? 'online' : 'offline' }
    </div>
  );
};
