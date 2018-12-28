/*
 * Login
 */
import React from 'react';

import querystring from 'querystring';

import { StyledContainer } from 'containers/App/styled';

const Spotify = {
  color: 'rgb(50,50,50)',
  cursor: 'pointer',
};

/* eslint-disable react/prefer-stateless-function */
export default class Login extends React.PureComponent {
  spotifyLogin() {
    const options = {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/callback',
      response_type: 'code',
      scope:
        'user-read-private user-read-email user-top-read ' +
        'user-modify-playback-state',
      show_dialog: true,
    };

    const baseUrl = 'https://accounts.spotify.com';
    const url = `${baseUrl}/authorize?${querystring.stringify(options)}`;

    window.location.href = url;
  }

  render() {
    return (
      <StyledContainer>
        <div onClick={this.spotifyLogin} style={Spotify}>
          Log in with Spotify
        </div>
      </StyledContainer>
    );
  }
}
