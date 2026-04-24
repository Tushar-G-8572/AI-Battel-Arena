import axios from "axios";

const api = axios.create({
  baseURL:'http://localhost:4000/api/ai',
  withCredentials:true
})

export async function sendProblemToAI(inputMessage) {
  const response = await api.post('/arena',{inputMessage})
  console.log("Service",response.data.data);
  return response.data;
}

export async function handleGetAllProblems() {
  const response = await api.get('/')
  console.log("ALL Problems",response.data.data);
  return response.data;
}


