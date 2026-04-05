import runGraph from '../ai/graph.ai.js'
import { type Request, type Response} from 'express'

export async function handleRunGraph(req:Request,res:Response) {
    try{
        const {inputMessage} = req.body;
        const response = await runGraph(inputMessage);
        return res.status(200).json({success:true,message:"Battle response fetched",data:response})
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false,message:"Error while getting battle response"})
    }

}