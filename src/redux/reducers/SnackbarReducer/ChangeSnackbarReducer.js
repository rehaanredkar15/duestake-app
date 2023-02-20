import { CHANGE_SNACKBAR } from '../../actiontype';


const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: ""
};

// eslint-disable-next-line import/no-anonymous-default-export
const ChangeSnackbarReducer =  (sidebarState = initialState, action) => {


   switch (action.type) {

    case CHANGE_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      return  {
        ...sidebarState,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      };;

    default:
      return sidebarState;
  }
};

export default ChangeSnackbarReducer;