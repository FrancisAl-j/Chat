import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { closeMessage } from "../redux/slices/authSlice";

const Success = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.auth);
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    dispatch(closeMessage());
  };

  useEffect(() => {
    if (message) {
      setProgress(100);
      const close = setTimeout(() => {
        dispatch(closeMessage());
      }, 3000);

      const timer = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 2 : 0));
      });

      return () => {
        clearTimeout(close);
        clearInterval(timer);
      };
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="bg-white shadow-xl w-[300px] border-2 rounded-lg fixed bottom-5 right-4 z-50">
      <header className="flex justify-end">
        <p onClick={handleClose} className="font-bold cursor-pointer px-1">
          x
        </p>
      </header>
      <div className="px-2 flex flex-col gap-2 my-2">
        <h1 className="font-bold text-green-600 text-3xl">Success!</h1>
        <p>{message}</p>
      </div>

      <div
        className={`bg-green-600 h-2 transition-all ease-linear duration-2800`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Success;
