import { takeLatest, call, select, put } from 'redux-saga/effects';

import querystring from 'querystring';

import backendClient from 'clients/backendSpotify';
import spotify from 'clients/spotify';

import {
  similarBandsSuccess,
  similarBandsFailure,
  topBandsSuccess,
  topBandsFailure,
  getTopBandsIds,
} from 'containers/BandsContainer/reducer';

import { getFestivals } from 'containers/FestivalsContainer/reducer';

import {
  getUserId,
  userSuccess,
  userFailure,
} from 'containers/UserContainer/reducer';

import {
  spotifyFinish,
  SPOTIFY_REQUEST,
  getToken,
  tokenSuccess,
} from './reducer';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(SPOTIFY_REQUEST, codeStratgey);
}

//
function* commonSaga(token) {
  yield put(tokenSuccess(token));

  const userId = yield caller(
    spotify().me,
    { token },
    userSuccess,
    userFailure,
    getUserId,
  );

  const topBandIds = yield caller(
    backendClient().fetchTopBands,
    { token, userId },
    topBandsSuccess,
    topBandsFailure,
    getTopBandsIds,
  );

  yield caller(
    backendClient().fetchSimilarBands,
    {
      token,
      topBandIds,
      userId,
    },
    similarBandsSuccess,
    similarBandsFailure,
  );

  yield put(spotifyFinish());

  yield put(getFestivals());
}

function* caller(get, args, success, failure, selector) {
  try {
    const response = yield call(get, args);
    yield put(success(response.data));
  } catch (error) {
    yield put(failure(error));
  }

  return selector ? yield select(selector) : undefined;
}

// worker saga: makes the api call when watcher saga sees the action
function* codeStratgey() {
  let token = yield select(getToken);

  // if (!token) {
  const parsedQuery = querystring.parse(location.search);
  const code = parsedQuery['?code'];
  const result = yield backendClient().getAuth({ code });
  token = result.data;
  // }

  yield commonSaga(token);
}
