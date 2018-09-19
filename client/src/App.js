import React, { Component } from 'react'
//router
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
//components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Footer from './components/layout/Footer'

class App extends Component {
  render() {
    return (
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
    )
  }
}

export default App
