import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { loginUser } from '../../actions/authActions'

class Login extends React.Component {

  //constructor and component state
  constructor() {
    super()
    //bind 'this'
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    //set state
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    //check for auth
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }

    //check for errors
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  //events -- can be switched for arrow functions and remove bind in constructor
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    //user
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    //call action
    this.props.loginUser(userData)
  }

  //==================render===================//
  render () {

    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Bainc account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" name="email" onChange={this.onChange}/>
                  {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" onChange={this.onChange}/>
                  {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
