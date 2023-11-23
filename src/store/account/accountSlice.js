import { createSlice } from '@reduxjs/toolkit';
import { accountRequestAsync, transferPostAsync } from './accountAction';

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
      state.error = action.payload.error;
    },
    [transferPostAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [transferPostAsync.fulfilled.type]: (state, action) => {
      if (!action.payload.error) {
        state.data = action.payload.data;
      }
      state.error = action.payload.error;
      state.loading = false;
    },
    [transferPostAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  }
});

export const accountReducer = accountSlice.reducer;
