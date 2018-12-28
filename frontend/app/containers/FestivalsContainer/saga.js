import { takeLatest, call, select, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  getFestivalsFailure,
  getFestivalsSuccess,
  SONGKICK_REQUEST,
} from './reducer';

import {
  getSimilarBandsNames,
  getTopBandsNames,
} from 'containers/BandsContainer/reducer';

import songkickBackendClient from 'clients/backendSongkick';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* songkickWatcherSaga() {
  yield takeLatest(SONGKICK_REQUEST, songkickSaga);
}

function* songkickSaga() {
  const similarBandNames = yield select(getSimilarBandsNames);
  const topBandNames = yield select(getTopBandsNames);

  try {
    const response = yield call(
      songkickBackendClient().fetchFestivals,
      similarBandNames,
      topBandNames,
    );

    yield put(getFestivalsSuccess(response.data));
  } catch (error) {
    yield put(getFestivalsFailure());
  }

  yield put(push('/festivals'));
}
