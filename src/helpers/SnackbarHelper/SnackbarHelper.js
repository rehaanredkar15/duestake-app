import { ChangeSnackbar } from '../../redux/actions/SnackbarActions/ChangeSnackbarAction';
import { useDispatch } from 'react-redux';


export const  handleSnackbar = (snackbarOpen,snackbarType,snackbarMessage,dispatch) => {

    const snackbarDetails = {
        snackbarOpen:snackbarOpen, 
        snackbarType:snackbarType,
        snackbarMessage:snackbarMessage
      }  
      console.log(snackbarDetails)
      dispatch(ChangeSnackbar(snackbarDetails))
}

