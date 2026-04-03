import express from 'express'
import runGraph from './ai/graph.ai.js'

const app = express();

app.get('/', async (req,res)=>{
    const response = await runGraph("tell me something about India?")
    res.status(200).json({message:"ok",
        response
    })
})


export default app;