import { useState, useContext } from 'react';

import { SocketContext } from '../context/socket-context';
import { AuthContext } from '../auth/auth-context';
import { ChatContext } from '../context/chat/chat-context';

export const SendMessage = () => {
  const [message, setMessage] = useState('');
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length === 0) return;
    const payload = {
      from: auth.uid,
      to: chatState.uid,
      message,
    };
    socket?.emit('personal-message', payload);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};
