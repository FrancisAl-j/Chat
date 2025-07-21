import Default from "../assets/default.jpg";
import { useAppSelector } from "../redux/Hooks";
import type { Message } from "../redux/Interfaces";

const MessageNotification = ({ message }: Message | any) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user?._id === message?.senderId?._id ? (
        <></>
      ) : (
        <section className="bg-white border-2 w-[350px] absolute right-0 top-2 p-1 rounded-xl flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <img
              src={Default}
              alt=""
              className="aspect-square w-9 rounded-full"
            />
            <h1>{message?.senderId?.username}</h1>
          </div>
          <p className=" self-end px-5">{message?.message}</p>
        </section>
      )}
    </>
  );
};

export default MessageNotification;
