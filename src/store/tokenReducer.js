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
};
