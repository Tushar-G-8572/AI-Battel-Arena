import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log("Socket is connected",socket.id);

    socket.on('disconnect',()=>{
        console.log("Socket disconnected",socket.id)
    })
  });
  return io;
}

export function getIO(){
    if(!io) throw new Error("Socket IO not initialised");
    return io;
}
