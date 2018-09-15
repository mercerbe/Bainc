//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateExperienceInput(data) {
  //object for error messages
  let errors = {}

  //check if title is empty with ternary
  data.title = !isEmpty(data.title) ? data.title : ''
  //check if company is empty with ternary
  data.company = !isEmpty(data.company) ? data.company : ''
  //check if from is empty with ternary
  data.from = !isEmpty(data.from) ? data.from : ''


  //check title
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required'
  }
  //check company
  if(Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required'
  }
  //check from
  if(Validator.isEmpty(data.from)) {
    errors.from = 'Must include a start date'
  }

  //
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
