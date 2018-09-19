import axios from 'axios'
import { GET_ERRORS } from './types'

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
