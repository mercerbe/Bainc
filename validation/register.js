//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateRegisterInput(data) {
  //object for error messages
  let errors = {}

  //check if name is empty with ternary
  data.name = !isEmpty(data.name) ? data.name : ''
  //check if email is empty with ternary
  data.email = !isEmpty(data.email) ? data.email : ''
  //check if password is empty with ternary
  data.password = !isEmpty(data.password) ? data.password : ''
  //check if passwordCheck is empty with ternary
  data.passwordCheck = !isEmpty(data.passwordCheck) ? data.passwordCheck : ''


  //check name
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }
  //check length of name
  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  //check email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  //check email is valid email
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email must be a valid email address'
  }
  //check password
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }
  //check password length
  if(!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = 'Password must be between 6 and 32 characters'
  }
  //check passwordCheck for empty field
  if(Validator.isEmpty(data.passwordCheck)) {
    errors.passwordCheck = 'Password must be confirmed to register'
  } else {
  //check passwordCheck to equal password field
  if(!Validator.equals(data.password, data.passwordCheck)) {
    errors.passwordCheck = 'Passwords must match!'
  }
}

  //
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
