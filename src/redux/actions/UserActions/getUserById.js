import * as api from '../../../api-calls/index';
import {GET_USER_BY_ID} from '../../actiontype.js'

export const GetUserDetails = (userId,navigate) => async(dispatch) => {

    try{
      const { data } = await api.getUserById(userId);

      if(data.success){
        dispatch({ type: "GET_USER_BY_ID", payload: data.data });

        localStorage.setItem("user",JSON.stringify(data.data))

        return data;
      }
      return data;
    }    
    catch(error)
   {
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Login: SomeThing Went Wrong"
     }; 
     return result;
   }
}