import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/store';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { APIRoute, AppRoute, AuthorizationStatus, City } from '../consts/enum';
import { changeAuthStatus, redirectToRoute, setLoading, setUser } from './reducers/api-reducer/api-actions';
import { Login } from '../types/app';
import { AuthUser } from '../types/comments';
import { removeToken, setToken } from '../services/token';
import { generatePath } from 'react-router-dom';
import { changeCity, filterCityOffers, setCityOffers } from './reducers/cities/city-actions';

type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

const fetchOffers = createAsyncThunk<void, City, ThunkConfig>(
  'fetchOffers',
  async (city, { dispatch, extra: api }) => {
    dispatch(setLoading(true));

    const { data: offers } = await api.get<Offers>(APIRoute.Offers);

    dispatch(setLoading(false));
    dispatch(setCityOffers(offers));
    dispatch(filterCityOffers(city));
    dispatch(changeCity());
  });

const checkAuth = createAsyncThunk<void, undefined, ThunkConfig>(
  'checkAuth',
  async (_args, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<AuthUser>(APIRoute.Login);

      dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    }
  });

const authenticateUser = createAsyncThunk<void, Login, ThunkConfig>(
  'authenticateUser',
  async (loginData, { dispatch, extra: api }) => {
    const { data } = await api.post<Exclude<AuthUser, null>>(APIRoute.Login, loginData);

    setToken(data.token);
    dispatch(changeAuthStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
    dispatch(redirectToRoute(generatePath(AppRoute.City, { city: City.Paris })));
  });

const logUserOut = createAsyncThunk<void, undefined, ThunkConfig>(
  'logUserOut',
  async (_args, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);

    removeToken();
    dispatch(setUser(null));
    dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(generatePath(AppRoute.City, { city: City.Paris })));
  });

export { fetchOffers, checkAuth, authenticateUser, logUserOut };
