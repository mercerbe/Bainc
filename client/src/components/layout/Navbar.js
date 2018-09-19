import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
  //logout onClick
  onLogoutClick(e){
    e.preventDefault()
    this.props.logoutUser()
    window.location.href = '/'
  }
  render() {
    const { isAuthenticated, user } = this.props.auth

    //========================Links====================//
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>
          <img
            className="rounded-circle"
            src={user.avatar} alt={user.name} style={{width:'25px', marginRight: '5px'}} title="You must have a gravatar connected to your email to display an avatar"/>
          Logout
          </a>
        </li>
      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )
    //================================================//

    //return standard jsx
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Bainc</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> {' '} Users
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
