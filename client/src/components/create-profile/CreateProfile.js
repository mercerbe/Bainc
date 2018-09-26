import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//textFieldGroup
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroupGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

class CreateProfile extends React.Component {
  //Constructor
  constructor(props){
    super()
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      spotifyusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      likedin: '',
      youtube: '',
      instagram: '',
      errors: {} //from redux state to this component
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

//event handlers
  onSubmit(e) {
    e.preventDefault()
    console.log('submit')
  }
  onChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  //render
  render () {
    const { errors } = this.state
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile
              </h1>
              <p className="lead text-center"> Add information about yourself to make your profile stand out </p>
              <small className="d-block pb-3"> * = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* YourProfileName"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile"
                  />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


//proptypes and mapping
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile)
