//redux
import { createStore, applyMiddleware, compose } from 'redux'
//thunk
import thunk from 'redux-thunk'
//root reducer -- index
import rootReducer from './reducers'

//initialState
const initialState = {}

//middleware
const middleware = [thunk]

//set store -- reducer array--rootReducer, state obj, middleware with spread
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     //add redux extension
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

export default store
