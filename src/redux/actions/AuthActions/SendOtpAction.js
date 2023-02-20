import * as api from '../../../api-calls/index';


export const SendOtp = (formData) => async(dispatch) => {

    try{

  
      const { data } = await api.SendOtp(formData);

      if(data.success){

        // navigate("/")
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