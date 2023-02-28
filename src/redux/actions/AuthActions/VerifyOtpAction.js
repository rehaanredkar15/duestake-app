import * as api from '../../../api-calls/index';


export const VerifyOtp = (formData) => async(dispatch) => {

    try{

  
      const { data } = await api.VerifyOtp(formData);

      if(data.success){

        console.log(data);
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