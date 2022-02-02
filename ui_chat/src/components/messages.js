import { useContext } from 'react';

import { SendMessage } from './send-message';
import { IncomingMessage } from './incoming-message';
import { OutgoingMessage } from './outgoing-message';
import { ChatContext } from '../context/chat/chat-context';
import { AuthContext } from '../auth/auth-context';

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="mesgs">
      <div id="messages" className="msg_history">
        {
          chatState.messages.map(msg => {
            if (msg.from === auth.uid) {
              return <IncomingMessage key={msg._id} message={msg} />;
            }
            return <OutgoingMessage key={msg._id} message={msg} />;
          })
        }
      </div>
      <SendMessage />
    </div>
  );
};
