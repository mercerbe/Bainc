const initialState = {
  isAuthenticated: false,
  user: {}
}

//every reducer exports a function
export default function(state = initialState, action) {
  //test with switch
  switch(action.type) {
    default:
      return state
  }
}
