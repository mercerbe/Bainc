import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'


//register a user
export const registerUser = (userData, history) => dispatch => {

  //axios to submit new user to api
  axios
    .post('/api/users/register', userData)
    //redirect to login
    .then(res => history.push('/login'))
    //catch errors
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Login - get user from jwt token
export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data
      // Set token to local storage -- only stores strings - our token is a string
      localStorage.setItem('jwtToken', token)
      //set token to Auth header
      setAuthToken(token)
      //decode token to get user data
      const decoded = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// log out a user
export const logoutUser = () => dispatch => {
  //remove token
  localStorage.removeItem('jwtToken')

  //remove auth header for future requests
  setAuthToken(false)

  //set current user to {} which sets isAuthenticated to false
  dispatch(setCurrentUser({}))
}
