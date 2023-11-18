import { createSlice } from '@reduxjs/toolkit';
import { accountRequestAsync } from './accountAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [accountRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [accountRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [accountRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export const accountReducer = accountSlice.reducer;
