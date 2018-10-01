import axios from 'axios'
import {
  ADD_POST,
  GET_POSTS,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING
} from './types'

//Add a new post -- dispatch for every async
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
