import { useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import ScrollContainer from "../components/ScrollContainer";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { GetMessagesThunk } from "../redux/thunks/messageThunk";
import type { Message } from "../redux/Interfaces";
import { socket } from "../socket/Socket";
import { liveMessage } from "../redux/slices/messageSlice";

const Container = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.room);
  const { messages } = useAppSelector((state) => state.message);

  useEffect(() => {
    dispatch(GetMessagesThunk(roomId as string));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomId) {
      socket.on("new-message", (newMessage: any) => {
        dispatch(liveMessage(newMessage));
      });
    }
  }, [dispatch, roomId]);
  return (
    <>
      <ScrollContainer>
        <div className="">
          {messages &&
            messages.map((message: Message, index: number) => {
              return (
                <ChatBubble
                  key={index}
                  userId={message.senderId._id}
                  message={message.message}
                  username={message.senderId.username}
                  date={message.createdAt}
                  image={message.image}
                />
              );
            })}
        </div>
      </ScrollContainer>
    </>
  );
};

export default Container;
