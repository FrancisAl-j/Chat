import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { SpecificRoomThunk } from "../redux/thunks/roomThunk";
import Global from "../assets/global.svg";
import { clearRoom } from "../redux/slices/roomSlice";
import { clearMessages } from "../redux/slices/messageSlice";
import { socket } from "../socket/Socket";

const Header = () => {
  const dispatch = useAppDispatch();
  const { room, roomId } = useAppSelector((state) => state.room);

  useEffect(() => {
    dispatch(SpecificRoomThunk(roomId as string));
    socket.emit("join_room", roomId);

    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [dispatch, roomId]);

  const handleClearRoom = () => {
    dispatch(clearRoom());
    dispatch(clearMessages());
  };

  return (
    <>
      {room && (
        <header className="border-b-2 flex gap-5 items-center p-1 w-full justify-between">
          <div className="flex gap-5 items-center">
            {room.name === "World Chat" ? (
              <img
                src={Global}
                alt="global icon"
                className="aspect-square w-10"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 grid place-items-center">
                <h1 className="font-extrabold text-lg">
                  {room.name.charAt(0)}
                </h1>
              </div>
            )}
            <h1 className="text-lg font-bold">{room.name}</h1>
          </div>
          <p
            onClick={handleClearRoom}
            className="px-1 cursor-pointer text-xl font-bold text-red-600 self-center"
          >
            x
          </p>
        </header>
      )}
    </>
  );
};

export default Header;
