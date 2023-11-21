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
        return data;
      })
      .catch((error) => ({ error: error.message }));
  }
);

export const transferPostAsync = createAsyncThunk(
  'account/send',
  ({ to, amount }, { getState }) => {
    console.log('to, amount: ', to, amount);
    const token = getState().token.token;
    const currentAccount = getState().account.data.account;
    console.log('currentAccount: ', currentAccount);

    if (!token) return;

    return axios.post(
      `${URL_API}/transfer-funds`,
      {
        from: currentAccount,
        to,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({ data: { payload, error } }) => {
        const data = payload;

        return { data, error };
      })
      .catch((error) => ({ error: error.message }));
  }
);
