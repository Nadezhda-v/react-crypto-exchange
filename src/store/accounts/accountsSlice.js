import { createSlice } from '@reduxjs/toolkit';
import { accountsRequestAsync } from './accountsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [accountsRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [accountsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [accountsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export const accountsReducer = accountsSlice.reducer;
