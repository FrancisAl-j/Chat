import { useAppSelector } from "../redux/Hooks";
import Default from "../assets/default.jpg";

const ChatBubble = ({
  userId,
  message,
  username,
  date,
  image,
}: {
  userId: string;
  message: string;
  username: string;
  date?: Date | undefined | string;
  image?: string;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <div
        className={`chat ${userId === user?._id ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={Default} />
          </div>
        </div>
        <div className="chat-header">
          {username}
          <time className="text-xs opacity-50">
            {date
              ? new Date(date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </time>
        </div>
        <div
          className={`chat-bubble ${
            userId === user?._id ? "" : "chat-bubble-neutral"
          }`}
        >
          {image && <img src={image} alt="Chat image" className="w-3xs h-28" />}
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
