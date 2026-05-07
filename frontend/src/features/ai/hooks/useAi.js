import { useDispatch } from "react-redux";
import { sendProblemToAI, getAllProblems, getBattleByID} from "../service/battleService";
import {setError,setAiResponse,setLoading, setProblemStatement} from '../ai.slice'

const useAi = ()=>{
    const dispatch = useDispatch();

    async function handleSendProblemToAI(inputMessage) {
        try{
        dispatch(setLoading(true));
        const response = await sendProblemToAI(inputMessage);
        dispatch(setAiResponse(response.data));
        }
        catch(error){
        dispatch(setError(error.response?.data?.message || "sending problem error"));
        }
        finally{
        dispatch(setLoading(false));
        }
    }

    async function handleGetAllBattleProblems() {
        try{
            dispatch(setLoading(true));
            const result = await getAllProblems();
            // console.log("resukt",result.data)
            dispatch(setProblemStatement([...result.data]))
        }catch(error){
            console.error(error);
            // dispatch(setError(error.response?.data?.message || "Battle Problem error"))
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleGetBattleDetail(battleId) {
        try{
            dispatch(setLoading(true));
            const result = await getBattleByID(battleId);
            dispatch(setAiResponse(result.data));
            return result.data;
        }catch(error){
            console.error(error);
            // dispatch(setError(error.response?.data?.message || "Battle detail error"))
        }finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleSendProblemToAI,
        handleGetAllBattleProblems,
        handleGetBattleDetail
    }
}

export default useAi;