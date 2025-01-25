import { io } from "socket.io-client";

export const initializeSocket = () => {
  return io("http://localhost:3000");
};
