import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'
// GET_ERRORS,
//get current profile
export const getCurrentProfile = () => dispatch => {
  //dispatch for loading
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {} //if an error, send an empty profile
      })
    )
}

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
