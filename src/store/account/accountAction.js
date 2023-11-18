import axios from 'axios';
import { URL_API } from '../../api/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const accountRequestAsync = createAsyncThunk(
  'account/axios',
  (id, { getState }) => {
    const token = getState().token.token;

    if (!token) return;

    return axios(`${URL_API}account/${id}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({ data: { payload } }) => {
        const data = payload;
        console.log('data: ', data);
        return data;
      })
      .catch((error) => ({ error: error.message }));
  }
);
