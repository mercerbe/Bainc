//==============root reducer============//
import { combineReducers } from 'redux'
import authReducer from './authReducer'

//export object of reducers with combine method
export default combineReducers({
  auth: authReducer
})
