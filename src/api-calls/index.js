import axios from 'axios';
import moment from "moment";

const API = axios.create({ baseURL: 'https://duestake-api-v0-1-0.onrender.com/'});


// Login
export const LoginUser = (formData) => API.post(`v1/auth/userLogin`,formData);
export const VerifyOtp = (formData) => API.post(`v1/auth/verifyOtp`,formData);

//Register 
export const SendOtp = (formData) => API.post(`v1/auth/sendOtp`,formData);
export const UserRegister = (formData) => API.post(`v1/auth/userRegister`,formData);


// Fetch user
export const getUserById = (userId) => API.get(`v1/userdetails/getUserById/`+userId);

// Fetch user
export const GetBankDetails = () => API.get(`v1/bank/getAllBanks`);

// UpdateUser
export const UpdateLevelByIdLevel1 = (userId,formData) => API.post(`v1/userdetails/updateUserByIdLevel1/`+userId,formData);
export const UpdateLevelByIdLevel2 = (userId,formData) => API.post(`v1/userdetails/updateUserByIdLevel2/`+userId,formData);
export const UpdateLevelByIdLevel3 = (userId,formData) => API.post(`v1/userdetails/updateUserByIdLevel3/`+userId,formData);
export const UpdateLevelByIdLevel4 = (userId,formData) => API.post(`v1/userdetails/updateUserByIdLevel4/`+userId,formData);
export const UpdateLevelByIdLevel5 = (userId,formData) => API.post(`v1/userdetails/updateUserByIdLevel5/`+userId,formData);

// Update user
export const UpdateUserByIdByPanDetails = (userId,formData) => API.post(`v1/userdetails/updateUserByIdByPanDetails/`+userId,formData);
