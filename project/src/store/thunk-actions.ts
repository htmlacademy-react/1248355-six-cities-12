import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/store';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { APIRoute, AuthorizationStatus } from '../consts/enum';
import { changeAuthStatus } from './reducers/api-reducer/api-actions';

type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

const fetchOffers = createAsyncThunk<Promise<Offers>, undefined, ThunkConfig>(
  'fetchOffers',
  async (_args, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);

    return data;
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
