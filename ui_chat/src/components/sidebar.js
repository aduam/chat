import { useContext } from 'react';

import { SidebarChatItem } from './sidebar-chat-item';
import { ChatContext } from '../context/chat/chat-context';
import { AuthContext } from '../auth/auth-context';

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="inbox_chat">
      {chatState.users.filter(user => user.uid !== auth.uid).map(user => <SidebarChatItem key={user.uid} user={user} />)}
      <div className="extra_space"></div>
    </div>
  );
};
