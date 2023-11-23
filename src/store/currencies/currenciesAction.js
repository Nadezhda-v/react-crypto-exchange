import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/constants';

export const currenciesRequestAsync = createAsyncThunk(
  'currencies/get',
  (_, { getState }) => {
    const token = getState().token.token;

    if (!token) return;

    return axios(`${URL_API}currencies`,
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

export const currenciesBuyAsync = createAsyncThunk(
  'currencies/buy',
  (data, { getState }) => {
    const token = getState().token.token;
    const currentCurrencies = getState().currencies.data;

    if (!token) return;

    return axios.post(
      `${URL_API}currency-buy`, data,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({ data: { payload, error } }) => {
        const data = payload === null ? currentCurrencies : payload;

        return { data, error };
      })
      .catch(error => Promise.reject(error));
  }
);
