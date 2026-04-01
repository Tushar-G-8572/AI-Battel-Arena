import app from "./src/app.js";
import http from 'http';
import {initSocket}  from "./src/config/socket.config.js";

const httpServer = http.createServer(app);
initSocket(httpServer);

const port = 4000
httpServer.listen(port,()=>{
    console.log("Server is running on port 3000")
})