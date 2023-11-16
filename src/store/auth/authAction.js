import { deleteToken, updateToken } from '../tokenReducer';
import axios from 'axios';
import { URL_API } from '../../api/constants';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = (error) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authRequestAsync = (data) => (dispatch, getState) => {
  console.log('data: ', data);
  const token = getState().token.token;
  if (token) return;

  dispatch(authRequest());

  axios.post(`${URL_API}login`,
    data,
  )
    .then(({ data }) => {
      if (data.payload) {
        const token = data.payload.token;
        dispatch(updateToken(token));
      }
      dispatch(authRequestSuccess(data));
    })
    .catch((error) => {
      dispatch(deleteToken());
      dispatch(authRequestError(error.message));
    });
};
