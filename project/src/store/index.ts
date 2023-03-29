import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect/redirect';
import { dataLoadingStatusSlice } from './reducers/data-loading-status-slice/data-loading-status-slice';
import { NameSpace } from '../consts/enum';
import { citiesSlice } from './reducers/cities-slice/cities-slice';
import { offerSlice } from './reducers/offer-slice/offer-slice';
import { userSlice } from './reducers/user-slice/user-slice';

const api = createAPI();

const rootReducer = combineReducers({
  [NameSpace.DataStatus]: dataLoadingStatusSlice.reducer,
  [NameSpace.Cities]: citiesSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.User]: userSlice.reducer
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
