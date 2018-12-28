import { fork, take, call, select, put } from 'redux-saga/effects';

import backendClient from 'clients/backend';
import { getUserId } from '../UserContainer/reducer';

import { deleteSimilarBand } from './reducer';
import { dislike, like } from '../UserContainer/reducer';

import { LIKE_OR_DISLIKE } from './reducer';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* likeOrDislike(band, flag) {
  yield flag ? put(like(band)) : put(dislike(band));
}

function* deleteBand(band) {
  yield put(deleteSimilarBand(band));
}

function* sendLikeOrDislike(band, like) {
  const userId = yield select(getUserId);

  yield call(backendClient().likeOrDislike, band, like, userId);
}

export default function* watchLoadUserPage() {
  while (true) {
    const { band, like } = yield take(LIKE_OR_DISLIKE);

    yield fork(likeOrDislike, band, like);
    yield fork(deleteBand, band);
    yield fork(sendLikeOrDislike, band, like);
  }
}
