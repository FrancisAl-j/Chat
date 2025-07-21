import { lazy } from "react";
import { useAppSelector } from "../redux/Hooks";
import Waving from "../assets/waving.gif";

const Chat = lazy(() => import("../components/Chat"));

const Home = () => {
  const { roomId } = useAppSelector((state) => state.room);

  return (
    <div className="grid place-items-center h-[100svh] w-full">
      {roomId ? (
        <Chat />
      ) : (
        <div>
          <img src={Waving} alt="" />
        </div>
      )}
    </div>
  );
};

export default Home;
