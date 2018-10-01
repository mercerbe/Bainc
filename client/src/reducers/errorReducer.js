import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {}

//every reducer exports a function
export default function(state = initialState, action) {
  //test with switch
  switch(action.type) {
    default:
      return state
    case GET_ERRORS:
      return action.payload
    case CLEAR_ERRORS:
      return {}

  }
}
