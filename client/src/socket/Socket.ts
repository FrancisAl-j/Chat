import io from "socket.io-client";

/**
 * URL
 * https://chat-service-twai.onrender.com
 * http://localhost:4000
 */

export const socket = io("https://chat-service-twai.onrender.com");
