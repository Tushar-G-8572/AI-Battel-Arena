import axios from "axios";

const api = axios.create({
  baseURL:'http://localhost:4000/api/auth',
  withCredentials:true
})

export async function login({email,password}) {
  // console.log(email,password)
  const response = await api.post('/login',{email,password});
  return response.data;
}

export async function register(username,email,password) {
  const response = await api.post('/register',{email,password,username});
  return response.data;
}

export async function getMe() {
  const response = await api.get('/get-me');
  return response.data;
}

export async function logout() {
  const response = await api.get('/logout');
  return response.data;
}
