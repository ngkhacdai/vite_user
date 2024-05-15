import io from "socket.io-client";
import { API } from "../customAxios";

const socketService = () => {
  const socket = io(API);
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", (data) => {
    console.log("=== socket disconnected ====");
  });
  socket.on("error", (data) => {
    console.log("socket error", data);
  });
};

export default socketService;
