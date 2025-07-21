import type React from "react";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../redux/Hooks";

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const { messages } = useAppSelector((state) => state.message);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // TODO: This code below allow the chat container to scroll to top instead of scrolling down
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatContainerRef} className="h-full overflow-y-auto p-2">
      {children}
    </div>
  );
};

export default ScrollContainer;
