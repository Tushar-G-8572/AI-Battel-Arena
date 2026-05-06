import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name:"ai",
    initialState:{
        loading:false,
        error:null,
        aiResponse:null,
        problemStatement:[]
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setAiResponse:(state,action)=>{
            state.aiResponse = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        },
        setProblemStatement:(state,action)=>{
            state.problemStatement = action.payload
        },
        resetAI:(state)=>{
            state.aiResponse = null;
            state.problemStatement = [];
            state.error = null;
            state.loading = false;
        }
    }
})

export const {setAiResponse,setError,setLoading,setProblemStatement,resetAI} = aiSlice.actions;

export default aiSlice.reducer;