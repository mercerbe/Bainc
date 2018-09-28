import React, { Component } from 'react'
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//redux
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/common/PrivateRoute'
//track token
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
//styles
import './App.css'
//components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard.js'
import CreateProfile from './components/create-profile/CreateProfile'

//check for token on every page req
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user and is authenticated
  store.dispatch(setCurrentUser(decoded))
  //check for exp token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    //autologout user
    store.dispatch(logoutUser())
    //clear current profile
    store.dispatch(clearCurrentProfile())
    //redirect to home
    window.location.href = '/'
  }
}


class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App" style={{backgroundColor: '#cacec9', height: '100%'}}>
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    )
  }
}

export default App
