// action types
export const USER_FAILURE = 'app/containers/UserContainer/USER_FAILURE';
export const USER_SUCCESS = 'app/containers/UserContainer/USER_SUCCESS';

// reducer with initial state
const initialState = {
  error: null,
  spotify: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_FAILURE:
      return { ...state, error: action.error };
    case USER_SUCCESS:
      console.log('action');
      console.log(action);
      return { ...state, spotify: action.user, error: null };
    default:
      return state;
  }
}

// actions
export const userSuccess = user => ({
  type: USER_SUCCESS,
  user,
});

export const userFailure = error => ({
  type: USER_FAILURE,
  error,
});

// selectors
export const getUser = state => state.get('user');

export const getUserId = state => getUser(state).spotify.id;
