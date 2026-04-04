import app from "./src/app.js";
import http from 'http';
import {connectToDB} from './src/config/db.js'

const httpServer = http.createServer(app);

const port = 4000
connectToDB();
httpServer.listen(port,()=>{
    console.log("Server is running on port 4000")
})