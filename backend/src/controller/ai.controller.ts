import runGraph from '../ai/graph.ai.js'
import { type Request, type Response} from 'express'
import sessionModel from '../model/session.model.js';

export async function handleRunGraph(req:Request,res:Response) {
    try{
        const {inputMessage} = req.body;
        const id = req.user?.id;
        if (!id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const response = await runGraph(inputMessage);
        console.log(response);
        await sessionModel.create({
            problem:response.problem,
            user:id,
            solution_1:response.solution_1,
            solution_2:response.solution_2,
            judge:{
                solution_1_score:response.judge.solution_1_score,
                solution_2_score:response.judge.solution_2_score,
                solution_1_reasoning:response.judge.solution_1_reasoning,
                solution_2_reasoning:response.judge.solution_2_reasoning
            }


        })
        return res.status(200).json({success:true,message:"Battle response fetched",data:response})
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false,message:"Error while getting battle response"})
    }

}

export async function handleGetBattleHistory(req:Request,res:Response) {
    try{
        const {battleId} = req.params;
        const userId = req.user?.id;
        if(!battleId){
            return res.status(400).json({success:false,message:"battle ID needed"})
        }
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

    const battleDetail = await sessionModel.findOne({_id:battleId,user:userId});
    if(!battleDetail){
        return res.status(404).json({success:false,message:"No battle found"})
    } 
    return res.status(200).json({success:true,message:"Battle detals fetched",data:battleDetail})
}catch(error){
    console.error(error);
    return res.status(500).json({success:false,message:"Error while fetching battle details"})
}
}

export async function handleGetAllProblems(req:Request, res:Response) {
    try{

        const id = req.user?.id;
        if (!id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const battleProblems = await sessionModel.find({user:id}).lean()
        if(battleProblems.length<1){
            return res.status(200).json({success:true,message:"No battle started yet"});
        }

        return res.status(200).json({success:true,message:"Battle Problems fetched",data:battleProblems})

    }catch(error){
        console.log(error);
        return res.status(400).json({success:false,message:"Error while getting BattleProblems"})
    }
}