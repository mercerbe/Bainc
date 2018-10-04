import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'


class ProfileSpotify extends Component {

  render() {
    const { profile } = this.props

    return (
      <div style={{alignSelf: 'stretch', textAlign: 'center'}}>
        {profile.spotifyusername ? (
  <iframe           src={`https://open.spotify.com/follow/1/?uri=${profile.spotifyusername}&size=detail&theme=dark`}
    width="300"
    height="56" scrolling="no"
    frameborder="0"
    style={{border:'none', overflow:'hidden', marginLeft: '8%'}}
    allowtransparency="true"
    title={Math.random()}>
  </iframe>
) : null }
</div>

    )
  }
}


export default ProfileSpotify
