import { SendMessage } from './send-message';
import { IncomingMessage } from './incoming-message';
import { OutgoingMessage } from './outgoing-message';

export const Messages = () => {
  const msgs = [1,2,3,4,5,6,7,8];
  return (
    <div className="mesgs">
      <div className="msg_history">
        {
          msgs.map(msg => {
            if (msg % 2) {
              return <IncomingMessage key={msg} />;
            }
            return <OutgoingMessage key={msg} />;
          })
        }
      </div>
      <SendMessage />
    </div>
  );
};
