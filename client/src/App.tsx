import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { CheckThunk } from "./redux/thunks/authThunk";
import Success from "./components/Success";
import Sidebar from "./components/Sidebar";
import MessageNotification from "./notification/MessageNotification";
import type { Message } from "./redux/Interfaces";
import { clearNotif, showNotif } from "./redux/slices/messageSlice";
import { socket } from "./socket/Socket";

// Code Splitting (For Optimization)
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Admin = lazy(() => import("./admin/Admin"));

const App = () => {
  const dispatch = useAppDispatch();
  const { message, user } = useAppSelector((state) => state.auth);
  const [dataMessage, setDataMessage] = useState<Message | null>(null);
  const { notif } = useAppSelector((state) => state.message);

  useEffect(() => {
    socket.on("notification", (newMessage: any) => {
      setDataMessage(newMessage);
      dispatch(showNotif());
    });
  }, [dispatch]);

  useEffect(() => {
    const close = setTimeout(() => {
      dispatch(clearNotif());
      setDataMessage(null);
    }, 2000);

    return () => {
      clearInterval(close);
    };
  });

  useEffect(() => {
    console.log("Only when checking authentication");

    const init = async () => {
      await dispatch(CheckThunk());
    };

    init();
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <div className="relative flex">
        <Sidebar />
        {notif && <MessageNotification message={dataMessage} />}
        <main className="w-full">
          {message && <Success />}

          <Routes>
            <Route path="/" element={user?.admin ? <Admin /> : <Home />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/signin"
              element={user ? <Navigate to="/" /> : <Signin />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
