import { types } from '../../types/types';
import { initialState } from './chat-context';

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.uploadedUsers:
      return {
        ...state,
        users: action.payload,
      };
    case types.assignUid:
      if (state.uid === action.payload) return state;
      return {
        ...state,
        uid: action.payload,
        activeChat: true,
        messages: [],
      };
    case types.recieveMsg:
      if (state.uid === action.payload.from || state.uid === action.payload.to) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }
    case types.getMessages:
      return {
        ...state,
        messages: [...action.payload],
      };
    case types.closeSession:
      return { ...initialState };
    default:
      return state;
  }
};