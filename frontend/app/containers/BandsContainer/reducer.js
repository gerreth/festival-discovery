// action types
export const SIMILAR_BANDS_SUCCESS =
  'app/containers/BandsContainer/SIMILAR_BANDS_SUCCESS';
export const SIMILAR_BANDS_FAILURE =
  'app/containers/BandsContainer/SIMILAR_BANDS_FAILURE';
export const TOP_BANDS_SUCCESS =
  'app/containers/BandsContainer/TOP_BANDS_SUCCESS';
export const TOP_BANDS_FAILURE =
  'app/containers/BandsContainer/TOP_BANDS_FAILURE';

// reducer with initial state
const initialState = {
  similar: [],
  top: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIMILAR_BANDS_SUCCESS:
      return { ...state, similar: action.similar };
    case SIMILAR_BANDS_FAILURE:
      return { ...state, error: action.error };
    case TOP_BANDS_SUCCESS:
      return { ...state, top: action.top };
    case TOP_BANDS_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

// actions creators
export const topBandsSuccess = top => ({
  type: TOP_BANDS_SUCCESS,
  top,
});

export const topBandsFailure = error => ({
  type: TOP_BANDS_FAILURE,
  error,
});

export const similarBandsSuccess = similar => ({
  type: SIMILAR_BANDS_SUCCESS,
  similar,
});

export const similarBandsFailure = error => ({
  type: SIMILAR_BANDS_FAILURE,
  error,
});

// selectors
const getBands = state => state.get('bands');

export const getSimilarBands = state => getBands(state).similar;
export const getTopBands = state => getBands(state).top;

export const getSimilarBandsIds = state =>
  getSimilarBands(state).map(band => band.id);
export const getTopBandsIds = state => getTopBands(state).map(band => band.id);

export const getSimilarBandsNames = state =>
  getSimilarBands(state).map(band => band.name);
export const getTopBandsNames = state =>
  getTopBands(state).map(band => band.name);
