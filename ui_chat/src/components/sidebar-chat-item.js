import { useContext } from 'react';

import { ChatContext } from '../context/chat/chat-context';
import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scroll-to-bottom';

export const SidebarChatItem = ({ user }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { uid } = chatState

  const assignUid = async () => {
    dispatch({
      type: types.assignUid,
      payload: user.uid,
    });

    const res = await fetchWithToken(`messages/${user.uid}`);
    dispatch({
      type: types.getMessages,
      payload: res.messages
    });
    scrollToBottom('messages');
  };

  return (
    <div className={`chat_list ${uid === user.uid && 'active_chat'}`} onClick={assignUid}>
      <div className="chat_people">
        <div className="chat_img">
          <img src="/account-avatar.png" alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{ user.name }</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
