import * as api from '../../../api-calls/index';


export const UpdateLevel5 = (userId,formData) => async(dispatch) => {

    try{
      console.log(formData);
      
      const { data } = await api.UpdateLevelByIdLevel5(userId,formData);


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