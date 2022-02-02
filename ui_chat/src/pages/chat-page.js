import { useContext } from 'react';

import { InboxPeople, Messages, ChatSelect } from '../components';
import { ChatContext } from '../context/chat/chat-context';
import '../css/chat.css';

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className="messaging">
        <div className="inbox_msg">
            <InboxPeople />
            {!chatState.activeChat ? <ChatSelect /> : <Messages />}
      </div>
    </div>
  );
};
