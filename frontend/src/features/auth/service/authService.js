import axios from "axios";

const api = axios.create({
  baseURL:'http://localhost:4000/api',
  withCredentials:true
})

export async function login(data) {
  const {email,password} = data;
  const response = await api.post('/login',{email,password});
  return response.data;
}

export async function register(data) {
  const {username,email,password} = data;
  const response = await api.post('/register',{email,password,username});
  return response.data;
}

export async function getMe() {
  const response = await api.get('/get-me');
  return response.data;
}
