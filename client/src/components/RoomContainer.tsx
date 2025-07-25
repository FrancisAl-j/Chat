import type { Room } from "../redux/Interfaces";
import Global from "../assets/global.svg";
import { useAppDispatch } from "../redux/Hooks";
import { selectRoom } from "../redux/slices/roomSlice";

const RoomContainer = ({ _id, name, tags }: Room) => {
  const dispatch = useAppDispatch();

  const handleSelectRoom = (id: string) => {
    dispatch(selectRoom(id));
  };

  return (
    <div
      onClick={() => handleSelectRoom(_id)}
      className="w-full shadow-lg p-2 rounded-md flex gap-5 cursor-pointer hover:bg-gray-200"
    >
      {name === "World Chat" ? (
        <img src={Global} alt="" className="w-12" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-blue-400 grid place-items-center">
          <h1 className="font-extrabold text-2xl">{name.charAt(0)}</h1>
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-xs text-gray-400">{tags.join(" | ")}</p>
      </div>
    </div>
  );
};

export default RoomContainer;
