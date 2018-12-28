// action types
export const SPOTIFY_REQUEST = 'app/containers/Callback/SPOTIFY_REQUEST';
export const SPOTIFY_FINISH = 'app/containers/Callback/SPOTIFY_FINISH';
export const TOKEN_FAILURE = 'app/containers/Callback/TOKEN_FAILURE';
export const TOKEN_SUCCESS = 'app/containers/Callback/TOKEN_SUCCESS';

// reducer with initial state
const initialState = {
  fetching: false,
  token: undefined,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SPOTIFY_REQUEST:
      return { ...state, fetching: true, error: null };
    case SPOTIFY_FINISH:
      return { ...state, fetching: false, error: null };
    case TOKEN_FAILURE:
      return { ...state, error: action.error };
    case TOKEN_SUCCESS:
      return { ...state, token: action.token };
    default:
      return state;
  }
}

// actions
export const spotifyFinish = () => ({
  type: SPOTIFY_FINISH,
});

export const spotifyRequest = () => ({
  type: SPOTIFY_REQUEST,
});

export const tokenSuccess = token => ({
  type: TOKEN_SUCCESS,
  token,
});

export const tokenFailure = error => ({
  type: TOKEN_FAILURE,
  error,
});

// selectors
const getSpotify = state => state.get('spotify');

export const getToken = state => getSpotify(state).token;
