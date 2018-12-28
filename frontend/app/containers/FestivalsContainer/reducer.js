// action types
export const SONGKICK_REQUEST = 'app/containers/Callback/SONGKICK_REQUEST';
export const SONGKICK_REQUEST_FAILURE =
  'app/containers/Callback/SONGKICK_REQUEST_FAILURE';
export const SONGKICK_REQUEST_SUCCESS =
  'app/containers/Callback/SONGKICK_REQUEST_SUCCESS';

// reducer with initial state
const initialState = {
  festivals: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SONGKICK_REQUEST_SUCCESS:
      return { ...state, festivals: action.festivals };
    default:
      return state;
  }
}

// action creators
export const getFestivals = () => ({
  type: SONGKICK_REQUEST,
});

export const getFestivalsFailure = () => ({
  type: SONGKICK_REQUEST_FAILURE,
});

export const getFestivalsSuccess = festivals => ({
  festivals,
  type: SONGKICK_REQUEST_SUCCESS,
});
