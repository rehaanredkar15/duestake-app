import * as api from '../../../api-calls/index';


export const UpdateLevel3 = (userId,formData) => async(dispatch) => {

    try{
      const { data } = await api.UpdateLevelByIdLevel3(userId,formData);


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