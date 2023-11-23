import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/constants';

export const allCurrenciesRequestAsync = createAsyncThunk(
  'allCurrencies/get',
  (_, { getState }) => {
    const token = getState().token.token;

    if (!token) token;

    return axios(`${URL_API}all-currencies`,
      {
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
