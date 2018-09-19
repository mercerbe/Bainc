//axios defaults -- for setting headers -- prevents us from having to manually check for the token on each request
import axios from 'axios'

const setAuthToken = token => {
  if(token) {
    //set for every req
    axios.defaults.headers.common['Authorization'] = token
  } else {
    //delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
