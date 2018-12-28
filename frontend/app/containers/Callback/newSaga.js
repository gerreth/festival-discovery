import { takeLatest, call, select, put } from 'redux-saga/effects';

import * as spotifyCallback from './reducer';

import backendSongkick from 'clients/backendSongkick';
import backendSpotify from 'clients/backendSpotify';
import spotify from 'clients/spotify';

const backendSongkickClient = backendSongkick();
const backendSpotifyClient = backendSpotify();
const spotifyClient = spotify();

export default function* watcherSaga() {
  console.log(spotifyCallback.SPOTIFY_REQUEST);
  yield takeLatest(spotifyCallback.SPOTIFY_REQUEST, saga);
}

function* saga() {
  console.log('start');
  try {
    // get token
    // set token success
  } catch (error) {
    // set token failure
  }

  try {
    // get top bands
    // set top bands success
  } catch (error) {
    // set top bands failure
  }

  try {
    // get similar bands
    // set similar bands success
  } catch (error) {
    // set similar bands failure
  }

  try {
    // get festivals
    // set festivals success
  } catch (error) {
    // set festivals failure
  }
  console.log('finish');
}

function* blueprint(request, options, success, failure) {
  let data;

  try {
    // get token
    const response = yield call(request, options);
    data = response.data;
    // set token success
    yield put(success(data));
  } catch (error) {
    // set token failure
    yield put(failure(error));
  }

  return data;
}
