import { combineReducers } from 'redux'
import LoginReducer from './AuthReducers/UserLoginReducer'
import ChangeSnackbarReducer from './SnackbarReducer/ChangeSnackbarReducer';


const indexReducer = combineReducers({
      userDetails:LoginReducer,
      snackBarState:ChangeSnackbarReducer,

  })


export default indexReducer