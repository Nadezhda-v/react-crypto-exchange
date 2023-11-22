import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/constants';

export const currenciesRequestAsync = createAsyncThunk(
  'currencies/get',
  (_, { getState }) => {
    const token = getState().token.token;

    if (!token) return;

    return axios(`${URL_API}/currencies`,
      {
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
