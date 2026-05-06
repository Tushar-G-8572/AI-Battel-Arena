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

export async function getAllProblems() {
  const response = await api.get('/problems')
  console.log("ALL Battle Problems",response.data.data);
  return response.data;
}

export async function getBattleByID(battleId) {
  const response = await api.get(`/battleHistory/${battleId}`);
  // console.log("Specific problem fetched",response.data.data);
  return response.data;
}


