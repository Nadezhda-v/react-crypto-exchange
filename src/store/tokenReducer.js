import { setToken, delToken } from '../api/token';

const initinalState = {
  token: '',
};

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});

const tokenMiddleware = store => next => (action) => {
  if (action.type === UPDATE_TOKEN) {
    setToken(action.token);
  }

  if (action.type === DELETE_TOKEN) {
    delToken();
  }

  next(action);
};

const tokenReducer = (state = initinalState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case DELETE_TOKEN:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
};

export {
  tokenReducer,
  updateToken,
  deleteToken,
  tokenMiddleware,
};
