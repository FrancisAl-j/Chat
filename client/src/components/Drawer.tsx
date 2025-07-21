import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { useEffect } from "react";
import { GetRoomsThunk } from "../redux/thunks/roomThunk";
import CreateChat from "./CreateChat";
import Default from "../assets/default.jpg";
import type { Room } from "../redux/Interfaces";
import RoomContainer from "./RoomContainer";

const Drawer = () => {
  const dispatch = useAppDispatch();
  const { allRooms } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetRoomsThunk());
  }, [dispatch]);

  return (
    <div className="drawer drawer-end block lg:hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Chats
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
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
          <CreateChat />
          {allRooms &&
            allRooms.map((room: Room, index: number) => {
              return (
                <label
                  key={index}
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                >
                  <RoomContainer
                    _id={room._id}
                    name={room.name}
                    description={room.description}
                    tags={room.tags}
                    ownerId={room.ownerId}
                  />
                </label>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
