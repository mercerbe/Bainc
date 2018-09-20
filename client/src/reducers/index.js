//==============root reducer============//
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'

//export object of reducers with combine method
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
})
