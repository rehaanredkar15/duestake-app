import {GET_USER_BY_ID} from '../../actiontype.js'


// eslint-disable-next-line import/no-anonymous-default-export
const GetUserReducer =  (user = [] , action) => {

    switch (action.type) {
        
    case GET_USER_BY_ID:
            return action.payload;

     default:
       return user;
   }
 };
 
 export default GetUserReducer;