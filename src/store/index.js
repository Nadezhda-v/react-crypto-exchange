import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { accountsReducer } from './accounts/accountsSlice';
import { authReducer } from './auth/authReducer';
import { createAccountReducer } from './createAccount/createAccountSlice';
import { accountReducer } from './account/accountSlice';
import { currenciesReducer } from './currencies/currenciesSlice';
import { allCurrenciesReducer } from './allCurrencies/allCurrenciesSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  token: tokenReducer,
  auth: authReducer,
  accounts: accountsReducer,
  createAccount: createAccountReducer,
  account: accountReducer,
  currencies: currenciesReducer,
  allCurrencies: allCurrenciesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tokenMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
