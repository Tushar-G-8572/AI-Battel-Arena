import app from "./src/app.js";
import http from 'http';

const httpServer = http.createServer(app);

const port = 4000
httpServer.listen(port,()=>{
    console.log("Server is running on port 4000")
})