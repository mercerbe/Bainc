import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'


class ProfileSpotifyPlay extends Component {

  render() {
    const { profile } = this.props
    let spotifyalbum = profile.spotifyplay
    let spotifyalbumurl = spotifyalbum.substr(14)

    return (
      <div style={{alignSelf: 'stretch', textAlign: 'center'}}>
        {profile.spotifyplay ? (
          <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-info">Audio</h3>
              {profile.spotifyplay ?  (
            <iframe
              src={`https://open.spotify.com/embed/album/${spotifyalbumurl}`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              title={Math.random()}>
            </iframe>
          ) : (
          <p className="text-center">No Audio Uploded</p>
          )}
          </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Video</h3>
          <p className="text-center">Coming Soon</p>
        </div>
        </div>
      ) : null }
    </div>

    )
  }
}


export default ProfileSpotifyPlay
