import { combineReducers } from 'redux'
import LoginReducer from './AuthReducers/UserLoginReducer'
import ChangeSnackbarReducer from './SnackbarReducer/ChangeSnackbarReducer';
import GetUserReducer from './UserReducer/GetUserReducer';


const indexReducer = combineReducers({
      userDetails:LoginReducer,
      snackBarState:ChangeSnackbarReducer,
      user:GetUserReducer,
  })


export default indexReducer