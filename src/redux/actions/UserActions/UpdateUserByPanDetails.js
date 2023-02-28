import * as api from '../../../api-calls/index';


export const UpdateUserByIdByPanDetails = (userId,formData) => async(dispatch) => {

    try{
      console.log(formData);
      
      const { data } = await api.UpdateUserByIdByPanDetails(userId,formData);


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