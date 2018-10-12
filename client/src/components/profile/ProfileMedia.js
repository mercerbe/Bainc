import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'


class ProfileSpotifyPlay extends Component {

  render() {
    const { profile } = this.props
    //grab url data to link an album
    let spotifyalbum = profile.spotifyplay
    let spotifyalbumurl = spotifyalbum.substr(14)
    //grab url data to link a video
    let profilevideo = profile.profilevideo
    let profilevideourl = profilevideo.substr(32)

    return (
      <div style={{alignSelf: 'stretch', textAlign: 'center'}}>
        {profile.spotifyplay ? (
          <div className="row row-eq-height">
            <div className="col-md-6">
              <h3 className="text-center text-info">Audio</h3>
              {profile.spotifyplay ?  (
                <li className="list-group-item">
                <iframe
                  src={`https://open.spotify.com/embed/album/${spotifyalbumurl}`}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title={Math.random()}>
                </iframe>
              </li>
          ) : (
          <p className="text-center">No Audio Uploded</p>
          )}
          </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Video</h3>
          {profile.profilevideo ? (
            <li className="list-group-item">
              <iframe
                id="ytplayer"
                type="text/html"
                width="360"
                height="202.5"
                src={`https://www.youtube.com/embed/${profilevideourl}?autoplay=0&origin=${profile.profilevideo}`}
                frameborder="0"
                title={Math.random()}
                >
              </iframe>
            </li>
          ) : (
            <p className="text-center">No Video Uploaded</p>
          )}
        </div>
        </div>
      ) : null }
    </div>

    )
  }
}


export default ProfileSpotifyPlay
