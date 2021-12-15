import { createContext } from 'react';

import { useSocket } from '../hooks/use-socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { isOnline, socket } = useSocket('http://localhost:2000');
  return (
    <SocketContext.Provider value={{ isOnline, socket }}>
      { children }
    </SocketContext.Provider>
  );
};
