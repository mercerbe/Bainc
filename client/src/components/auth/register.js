import React from 'react'
import axios from 'axios'
//for conditional classes
import classnames from 'classnames'

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
    //axios to submit new user to api
    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))//set error obj to error msg from api
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
                <div className="form-group">
                  <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.name})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                  {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                  {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                  {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.passwordCheck})} placeholder="Confirm Password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.onChange} />
                  {errors.passwordCheck && (<div className='invalid-feedback'>{errors.passwordCheck}</div>)}
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

export default Register
