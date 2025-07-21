import { lazy } from "react";

const Header = lazy(() => import("../chat/Header"));
const Container = lazy(() => import("../chat/Container"));
const Input = lazy(() => import("../chat/Input"));

const Chat = () => {
  return (
    <main className="chat-container border-2 flex justify-between flex-col rounded-lg shadow-xl">
      <Header />
      <Container />
      <Input />
    </main>
  );
};

export default Chat;
