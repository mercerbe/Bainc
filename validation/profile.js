//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateProfileInput(data) {
  //object for error messages
  let errors = {}

  //check if empty with ternary and set to empty string
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  //check if empty with ternary
  data.status = !isEmpty(data.status) ? data.status : ''
  //check if empty with ternary
  data.skills = !isEmpty(data.skills) ? data.skills : ''

  //HANDLE VALIDATION
  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters'
  }
  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  }
  //STATUS VALIDATION
  if(Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }
  //SKILLS VALIDATION
  if(Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
  }
  //WEBSITE VALIDATION
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = 'Not a valid Url'
    }
  }
  //SOCIAL VALIDATION
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid Url'
    }
  }
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid Url'
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid Url'
    }
  }
  if(!isEmpty(data.linkedin)) {
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid Url'
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid Url'
    }
  }

  //return errors
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
