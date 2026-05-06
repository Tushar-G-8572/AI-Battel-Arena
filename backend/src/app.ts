import express from 'express'
import aiRouter from './routes/ai.routes.js';
import cors from 'cors'
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import { type Request, type Response} from 'express'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'..','public')));


app.use(cors({
    origin:'*',
    credentials:true,
    methods:['GET','POST']
}))
app.use(cookieParser());

app.use('/api/ai',aiRouter);
app.use('/api/auth',authRouter);

app.use('*name',(req:Request,res:Response)=>{
 res.sendFile(path.join(__dirname,'../..','public','index.html'));
})

export default app;