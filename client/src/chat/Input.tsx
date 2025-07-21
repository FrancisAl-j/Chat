import { useState, type FormEvent } from "react";
import Send from "../assets/send.svg";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import type { MessageData } from "../redux/Interfaces";
import { CreateMessageThunk } from "../redux/thunks/messageThunk";

const Input = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.room);
  const [message, setMessage] = useState("");

  const handleCreateMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageData: MessageData = {
      message,
      roomId,
    };

    const result = await dispatch(CreateMessageThunk(messageData));

    if (CreateMessageThunk.fulfilled.match(result)) {
      setMessage("");
    }
  };
  return (
    <form onSubmit={handleCreateMessage} className="w-full">
      <div className="w-full flex">
        <input
          type="text"
          className="p-1 w-full border-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button disabled={!message}>
          <img
            src={Send}
            alt=""
            className={`aspect-square w-8 right-1 bottom-0.5 ${
              message ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            }`}
          />
        </button>
      </div>
    </form>
  );
};

export default Input;
