import { useContext } from 'react';

import { AuthContext } from '../auth/auth-context';
import { ChatContext } from '../context/chat/chat-context';
import { types } from '../types/types';

export const SearchBox = () => {
  const { logout, auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleLogout = () => {
    dispatch({
      type: types.closeSession,
    });
    logout();
  };

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{ auth.name }</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button
            className="btn text-danger"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
