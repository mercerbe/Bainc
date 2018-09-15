//=================dependencies====================//
const Validator = require('validator')
//check empty fields with custom is-empty validation
const isEmpty = require('./is-empty')
//=================================================//

module.exports = function validateExperienceInput(data) {
  //object for error messages
  let errors = {}

  //check if school is empty with ternary
  data.school = !isEmpty(data.school) ? data.school : ''
  //check if degree is empty with ternary
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  //check if fieldofstudy is empty with ternary
  data.company = !isEmpty(data.company) ? data.company : ''
  //check if from is empty with ternary
  data.from = !isEmpty(data.from) ? data.from : ''


  //check school
  if(Validator.isEmpty(data.school)) {
    errors.school = 'Job school field is required'
  }
  //check degree
  if(Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required'
  }
  //check fieldofstudy
  if(Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required'
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
