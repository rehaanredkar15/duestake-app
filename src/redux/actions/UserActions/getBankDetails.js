import * as api from '../../../api-calls/index';
import {GET_USER_BY_ID} from '../../actiontype.js'

export const GetBankDetails = (userId,navigate) => async(dispatch) => {

    try{
      const { data } = await api.GetBankDetails(userId);

      if(data.success){
       
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