import React, { Component } from 'react'
//router
import { BrowserRouter as Router, Route } from 'react-router-dom'
//redux
import { Provider } from 'react-redux'
import store from './store'
//styles
import './App.css'
//components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layout/Footer'


class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    )
  }
}

export default App
