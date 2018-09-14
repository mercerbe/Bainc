//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateLoginInput(data) {
  //object for error messages
  let errors = {}

  //check if email is empty with ternary
  data.email = !isEmpty(data.email) ? data.email : ''
  //check if password is empty with ternary
  data.password = !isEmpty(data.password) ? data.password : ''



  //check email is valid email
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email must be a valid email address'
  }
  //check email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  //check password
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  //
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
