import { useContext, createContext, useEffect } from 'react';

import { useSocket } from '../hooks/use-socket';
import { AuthContext } from '../auth/auth-context';
import { ChatContext } from './chat/chat-context';
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scroll-to-bottom';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { isOnline, socket, socketConnect, socketDisconnect } = useSocket('http://localhost:2000');
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      socketConnect();
    }
  }, [auth, socketConnect]);

  useEffect(() => {
    if (!auth.logged) {
      socketDisconnect();
    }
  }, [auth, socketDisconnect]);

  useEffect(() => {
    socket?.on('user-list', (users) => {
      dispatch({
        type: types.uploadedUsers,
        payload: users,
      })
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('personal-message', (msg) => {
      dispatch({
        type: types.recieveMsg,
        payload: msg,
      });
      scrollToBottomAnimated('messages');
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ isOnline, socket }}>
      { children }
    </SocketContext.Provider>
  );
};
