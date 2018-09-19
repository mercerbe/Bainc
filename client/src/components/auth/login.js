import React from 'react'

class Login extends React.Component {
  //component state
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
  //events
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    //user
    const User = {
      email: this.state.email,
      password: this.state.password
    }
    //log user info
    console.log(User)
  }
  render () {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Bainc account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={this.onChange}/>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" onChange={this.onChange}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
