import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './reducers/api-reducer/api-reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { cityReducer } from './reducers/cities/city-reducer';

const api = createAPI();

const rootReducer = combineReducers({
  api: apiReducer,
  city: cityReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

export { store, rootReducer };
