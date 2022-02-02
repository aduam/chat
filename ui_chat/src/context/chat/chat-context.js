import { createContext, useReducer } from 'react';

import { chatReducer } from './chat-reducer';

export const ChatContext = createContext();

export const initialState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: [],
};

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{
      chatState,
      dispatch,
    }}>
      { children }
    </ChatContext.Provider>
  );
};
