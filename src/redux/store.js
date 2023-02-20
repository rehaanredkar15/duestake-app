import { configureStore } from '@reduxjs/toolkit'
import indexReducer from './reducers/indexReducer'

const initialState = {}

const Store = configureStore({ 
  reducer:indexReducer,
})
export default Store