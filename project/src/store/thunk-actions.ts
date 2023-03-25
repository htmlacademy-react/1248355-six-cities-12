import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/store';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { APIRoute, AuthorizationStatus, City } from '../consts/enum';
import { changeCity, filterCityOffers, setCityOffers } from './reducers/cities/city-actions';
import { findParamInPath } from '../utils/browser-history';
import { changeAuthStatus, setLoading } from './reducers/api-reducer/api-actions';

type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

const fetchOffers = createAsyncThunk<void, undefined, ThunkConfig>(
  'fetchOffers',
  async (_args, { dispatch, extra: api }) => {
    dispatch(setLoading(true));

    const { data } = await api.get<Offers>(APIRoute.Offers);

    const city = findParamInPath<City>(Object.keys(City));

    dispatch(setLoading(false));
    dispatch(setCityOffers(data));

    if (city) {
      dispatch(filterCityOffers(city));
    } else {
      dispatch(filterCityOffers(City.Paris));
    }

    dispatch(changeCity());
  });

const checkAuth = createAsyncThunk<void, undefined, ThunkConfig>(
  'checkAuth',
  async (_args, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(changeAuthStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    }
  });

export { fetchOffers, checkAuth };
