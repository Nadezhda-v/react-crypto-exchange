import axios from 'axios';
import { URL_API } from '../../api/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const accountsRequestAsync = createAsyncThunk(
  'accounts/axios',
  (_, { getState }) => {
    const token = getState().token.token;

    if (!token) return;

    return axios(`${URL_API}accounts`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({ data: { payload } }) => {
        const data = payload;
        return data;
      })
      .catch((error) => ({ error: error.message }));
  }
);
