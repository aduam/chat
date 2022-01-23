import { SidebarChatItem } from './sidebar-chat-item';

export const Sidebar = () => {
  const chats = [1,2,3,4,5];
  return (
    <div className="inbox_chat">
      {chats.map(item => <SidebarChatItem key={item} />)}
      <div className="extra_space"></div>
    </div>
  );
};
