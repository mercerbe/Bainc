//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validatePostInput(data) {
  //object for error messages
  let errors = {}

  //check if email is empty with ternary
  data.text = !isEmpty(data.text) ? data.text : ''

  //check length of text
  if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters'
  }
  //check text
  if(Validator.isEmpty(data.text)) {
    errors.email = 'Text field is required'
  }

  //
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
