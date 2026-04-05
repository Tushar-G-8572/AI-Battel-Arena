import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name:"ai",
    initialState:{
        loading:false,
        error:null,
        aiResponse:null
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
        }
    }
})

export const {setAiResponse,setError,setLoading} = aiSlice.actions;

export default aiSlice.reducer;