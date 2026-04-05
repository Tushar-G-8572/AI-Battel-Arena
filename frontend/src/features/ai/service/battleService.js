// // Layer 3 - Service: Battle API calls
// const API_BASE  "http://localhost:3000/api";

// export const battleService = {
//   async startBattle(prompt, token) {
//     const res = await fetch(`${API_BASE}/battle`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ prompt }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Battle failed");
//     return data;
//   },

//   async getBattleHistory(token) {
//     const res = await fetch(`${API_BASE}/battle/history`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to load history");
//     return data;
//   },
// };


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
