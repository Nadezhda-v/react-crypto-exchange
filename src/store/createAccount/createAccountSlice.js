import { createSlice } from '@reduxjs/toolkit';
import { createAccountRequestAsync } from './createAccountAction';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [createAccountRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [createAccountRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [createAccountRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export const createAccountReducer = createAccountSlice.reducer;
