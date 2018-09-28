import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
//get profiles action
import { getProfiles } from '../../actions/profileActions'
//import individual profile items
import ProfileItem from './ProfileItem'

class Profiles extends React.Component {

  componentDidMount() {
    this.props.getProfiles()
  }

  render() {

    //deconstruct profiles and loading from props
    const { profiles, loading } = this.props.profile
    //define profileItems
    let profileItems

    if(profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0) {
        //if profiles are found
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile}/>
        ))
      } else {
        profileItems = <h4>No profiles found... </h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Bainc Users in the Music Industry</h1>
              <p className="lead text-center">
                Browse profiles and connect
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
