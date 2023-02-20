
import * as api from '../../../api-calls/index';
import { CHANGE_SNACKBAR } from '../../actiontype';

  
  export const ChangeSnackbar = (snackbarDetails) => async(dispatch) => {
 
      try{
  
         dispatch({type:"CHANGE_SNACKBAR" , payload: snackbarDetails})
        
         return true;
      }    
      catch(error)
     {
        return error.message;
  
     }
  }