import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './reducers/api-reducer/api-reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { offersReducer } from './reducers/offers/offers-reducer';
import { commentsReducer } from './reducers/comments/comments-reducer';

const api = createAPI();

const rootReducer = combineReducers({
  api: apiReducer,
  city: offersReducer,
  comments: commentsReducer
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
