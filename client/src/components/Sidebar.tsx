import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import type { Room } from "../redux/Interfaces";
import RoomContainer from "./RoomContainer";
import { GetRoomsThunk } from "../redux/thunks/roomThunk";
import Default from "../assets/default.jpg";
import CreateChat from "./CreateChat";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { allRooms } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetRoomsThunk());
  }, [dispatch, user]);

  return (
    <aside className="w-[300px] shadow-xl h-[100svh] hidden lg:block">
      {user && (
        <header className="flex items-center gap-5 mb-5 shadow-lg px-2 py-4">
          {user.image ? (
            <img src={user.image} alt="" />
          ) : (
            <img
              src={Default}
              alt=""
              className="aspect-square w-10 rounded-full"
            />
          )}
          <h1>{user?.username}</h1>
        </header>
      )}

      <div className="px-2">
        <CreateChat />
        {allRooms &&
          allRooms.map((room: Room, index: number) => {
            return (
              <RoomContainer
                key={index}
                _id={room._id}
                name={room.name}
                description={room.description}
                tags={room.tags}
                ownerId={room.ownerId}
              />
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
