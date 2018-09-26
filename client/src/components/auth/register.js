import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
//for conditional classes
//import classnames from 'classnames'
//connect for redux
import { connect } from 'react-redux'
//import action for component
import { registerUser } from '../../actions/authActions'
//import functional components
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends React.Component {

  //component state
  constructor() {
    super()
    //bind 'this'
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    //set state
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      errors: {}
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  //props from redux state -- put in from mapStateToProps
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  //events
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    //new user
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordCheck: this.state.passwordCheck
    }
    //register new user from props and history from withRouter -- now we can redirect within the action
    this.props.registerUser(newUser, this.props.history)
  }
  render () {
    //destructure and pull out errors from state
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Bainc account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Name"
                  placeholder="John Doe"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  />
                <TextFieldGroup
                  label="Email"
                  placeholder="Johndoe@gmail.com"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.name}
                  info="This site uses Gravatar. To have a profile image, please use an email with Gravatar"
                  />
                <TextFieldGroup
                  label="Password"
                  placeholder="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  />
                <TextFieldGroup
                  label="Confirm Password"
                  placeholder="password"
                  name="passwordCheck"
                  type="password"
                  value={this.state.passwordCheck}
                  onChange={this.onChange}
                  error={errors.passwordCheck}
                  />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth, //from root reducer
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
