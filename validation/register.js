//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateRegisterInput(data) {
  //object for error messages
  let errors = {}

  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
