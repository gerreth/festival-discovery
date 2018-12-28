/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import CallbackReducer from 'containers/Callback/reducer';
import BandsReducer from 'containers/BandsContainer/reducer';
import FestivalsReducer from 'containers/FestivalsContainer/reducer';
import UserReducer from 'containers/UserContainer/reducer';

const spotifyPersistConfig = {
  key: 'spotify',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
};

const userPersistConfig = {
  key: 'user',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
};

const bandsPersistConfig = {
  key: 'bands',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
};

const festivalsPersistConfig = {
  key: 'festivals',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    bands: persistReducer(bandsPersistConfig, BandsReducer),
    festivals: persistReducer(festivalsPersistConfig, FestivalsReducer),
    spotify: persistReducer(spotifyPersistConfig, CallbackReducer),
    user: persistReducer(userPersistConfig, UserReducer),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
