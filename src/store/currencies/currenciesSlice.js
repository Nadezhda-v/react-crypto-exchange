import { createSlice } from '@reduxjs/toolkit';
import { currenciesRequestAsync } from './currenciesAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: {
    [currenciesRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [currenciesRequestAsync.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    },
    [currenciesRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  }
});

export const currenciesReducer = currenciesSlice.reducer;
