import express from 'express'
import aiRouter from './routes/ai.routes.js';
import cors from 'cors'
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST']
}))

app.use('/api/ai',aiRouter);
app.use('/api/auth',authRouter);

export default app;