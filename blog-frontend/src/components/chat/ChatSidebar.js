import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
} from '@chatscope/chat-ui-kit-react';
import { getChat } from 'features/chat/chatSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatSidebar = ({ chats, user }) => {
  const [friends, Setfriends] = useState([]);
  const friendId = chats.map((c) => c.members.find((m) => m !== user._id));

  const dispatch = useDispatch();
  useEffect(() => {
    if (chats) {
      const res = getChat(friendId);
      console.log(res);
    }
  }, [friendId, chats]);
  return (
    <>
      <Search placeholder="Search..." />
      <ConversationList>
        {friends.map((c) => (
          <Conversation name={c}>
            <Avatar name="Lilly" status="available" />
          </Conversation>
        ))}
      </ConversationList>
    </>
  );
};

export default ChatSidebar;
