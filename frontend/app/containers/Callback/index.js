/*
 * HomePage
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import { spotifyRequest } from './reducer';
import spotifySaga from './saga';

import { getFestivals } from '../FestivalsContainer/reducer';
import songkickSaga from '../FestivalsContainer/saga';

/* eslint-disable react/prefer-stateless-function */
class Callback extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFromSpotify();
  }

  render() {
    return (
      <button onClick={() => this.props.fetchFromSongkick()}>Callback</button>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  fetchFromSpotify: () => dispatch(spotifyRequest()),
  fetchFromSongkick: () => dispatch(getFestivals()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSpotifySaga = injectSaga({ key: 'bands', saga: spotifySaga });
const withSongkickSaga = injectSaga({
  key: 'festivals',
  saga: songkickSaga,
});

export default compose(
  withSpotifySaga,
  withSongkickSaga,
  withConnect,
)(Callback);
