import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//textFieldGroup
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
//this is for post and update -- so we'll use the same action
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
//empty check
import isEmpty from '../../validation/is-empty'

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
      spotifyplay: '',
      profilevideo: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

//run as soon as mounted
componentDidMount() {
  this.props.getCurrentProfile()
}
//recieve props
componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors})
  }
  if(nextProps.profile.profile){
    const profile = nextProps.profile.profile

    //change skills back from array to CSV
    const skillsCSV = profile.skills.join(',')

    // check if field is empty, if so, make it an empty string
    profile.company = !isEmpty(profile.company) ? profile.company : ''
    profile.website = !isEmpty(profile.website) ? profile.website : ''
    profile.location = !isEmpty(profile.location) ? profile.location : ''
    profile.spotifyusername = !isEmpty(profile.spotifyusername) ? profile.spotifyusername : ''
    profile.spotifyplay = !isEmpty(profile.spotifyplay) ? profile.spotifyplay : ''
    profile.profilevideo = !isEmpty(profile.profilevideo) ? profile.profilevideo : ''
    profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
    profile.social = !isEmpty(profile.social) ? profile.social : {}
    profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
    profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
    profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
    profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
    profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

    //set component field state
    this.setState({
      handle: profile.handle,
      company: profile.company,
      website: profile.website,
      location: profile.location,
      status: profile.status,
      skills: skillsCSV,
      spotifyusername: profile.spotifyusername,
      spotifyplay: profile.spotifyplay,
      profilevideo: profile.profilevideo,
      bio: profile.bio,
      twitter: profile.twitter,
      facebook: profile.facebook,
      linkedin: profile.linkedin,
      youtube: profile.youtube,
      instagram: profile.instagram
    })
  }
}
//event handlers
  onSubmit(e) {
    e.preventDefault()
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      spotifyusername: this.state.spotifyusername,
      spotifyplay: this.state.spotifyplay,
      profilevideo: this.state.profilevideo,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    //redux actions are in props -- redirect needs withrouter
    this.props.createProfile(profileData, this.props.history)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  //render
  render () {
    const { errors, displaySocialInputs } = this.state
    //init social inputs
    let socialInputs
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }
    //options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Producer', value: 'Producer'},
      { label: 'Manager', value: 'Manager'},
      { label: 'Label', value: 'Label'},
      { label: 'Band', value: 'Band'},
      { label: 'Engineer', value: 'Engineer'},
      { label: 'Promoter', value: 'Promoter'},
      { label: 'Studio Musician', value: 'Studio Musician'},
      { label: 'Other', value: 'Other'}
    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Edit Your Profile
              </h1>
              <p className="lead text-center"> edit information about yourself to make your profile stand out </p>
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
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Tell everyone what you do in the industry"
                />
                <TextFieldGroup
                  placeholder="Company/Band"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Company you work for or band name"
                  />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your website"
                  />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state"
                  />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (e.g. Guitar, Pro tools, Analog Audio)"
                  />
                <TextFieldGroup
                  placeholder="Spotify URI (menu->share->'copy spotify URI')"
                  name="spotifyusername"
                  value={this.state.spotifyusername}
                  onChange={this.onChange}
                  error={errors.spotifyusername}
                  info="Link your Spotify account with a follow button"
                  />
                <TextFieldGroup
                  placeholder="Spotify URI (menu->share->'copy URI')"
                  name="spotifyplay"
                  value={this.state.spotifyplay}
                  onChange={this.onChange}
                  error={errors.spotifyplay}
                  info="Link a Spotify album to showcase your work"
                  />
                <TextFieldGroup
                  placeholder="Place your Youtube video link"
                  name="profilevideo"
                  value={this.state.profilevideo}
                  onChange={this.onChange}
                  error={errors.profilevideo}
                  info="Link a Youtube video to your profile"
                  />
                <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell everyone a little about yourself"
                  />
                <div className='mb-3'>
                  <button type="button"
                      onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                      className="btn btn-light">
                      Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
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
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile))
