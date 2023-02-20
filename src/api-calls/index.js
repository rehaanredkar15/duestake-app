import axios from 'axios';
import moment from "moment";

const API = axios.create({ baseURL: 'https://duestake-api-v0-1-0.onrender.com/'});


// Login
export const LoginUser = (formData) => API.post(`v1/auth/userLogin`,formData);
export const VerifyOtp = (formData) => API.post(`v1/auth/verifyOtp`,formData);

//Register 
export const SendOtp = (formData) => API.post(`v1/auth/sendOtp`,formData);
export const UserRegister = (formData) => API.post(`v1/auth/userRegister`,formData);
