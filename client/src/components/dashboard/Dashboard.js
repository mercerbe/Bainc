import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
//import loader
import Spinner from '../common/Spinner'

class Dashboard extends React.Component {
  //want profile to load right away, so use componentDidMount lifecyle method
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render () {
    //ensure profile state is not null

    //USER STILL DEFINED BUT NEVER USED -- 9/48
    const { user } = this.props.auth
    //=====================================//


    const { profile, loading } = this.props.profile

    //dashboard
    let dashboardContent
    //for content
    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      dashboardContent = <h1>It works</h1>
    }


    return(
      <div className="dashboard">
        <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
