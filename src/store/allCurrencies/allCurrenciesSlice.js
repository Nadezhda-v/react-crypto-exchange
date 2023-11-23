import { createSlice } from '@reduxjs/toolkit';
import { allCurrenciesRequestAsync } from './allCurrenciesAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const allCurrenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: {
    [allCurrenciesRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [allCurrenciesRequestAsync.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [allCurrenciesRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const allCurrenciesReducer = allCurrenciesSlice.reducer;
