import { useDispatch } from "react-redux";
import { sendProblemToAI } from "../service/battleService";
import {setError,setAiResponse,setLoading} from '../ai.slice'

const useAi = ()=>{
    const dispatch = useDispatch();

    async function handleSendProblemToAI(inputMessage) {
        try{
        dispatch(setLoading(true));
        const response = await sendProblemToAI(inputMessage);
        dispatch(setAiResponse(response.data));
        }
        catch(error){
        dispatch(setError(error));
        }
        finally{
        dispatch(setLoading(false));
        }
    }
    return {
        handleSendProblemToAI
    }
}

export default useAi;