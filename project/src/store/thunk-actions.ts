import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/store';
import { AxiosInstance } from 'axios';
import { Offer, Offers } from '../types/offers';
import { APIRoute, AuthorizationStatus, City } from '../consts/enum';
import { changeAuthStatus, redirectBack, setLoading, setUser } from './reducers/api-reducer/api-actions';
import { Login } from '../types/app';
import { AuthUser, Comments, NewComment } from '../types/comments';
import { removeToken, setToken } from '../services/token';
import { filterCityOffers, setCityOffers } from './reducers/offers/offers-actions';
import { setComments } from './reducers/comments/comments-actions';

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
  });

const fetchNearOffers = createAsyncThunk<Offers, string, ThunkConfig>(
  'fetchOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoading(true));

    const { data: offers } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);

    return offers;
  }
);

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
    dispatch(redirectBack());
  });

const logUserOut = createAsyncThunk<void, undefined, ThunkConfig>(
  'logUserOut',
  async (_args, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);

    removeToken();
    dispatch(setUser(null));
    dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
  });

const fetchOffer = createAsyncThunk<Offer, string, ThunkConfig>(
  'fetchOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoading(true));

    const { data: offer } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);

    return offer;
  }
);

const fetchComments = createAsyncThunk<Comments, string, ThunkConfig>(
  'fetchOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoading(true));

    const { data: comments } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);

    return comments;
  }
);

const createComment = createAsyncThunk<void, NewComment, ThunkConfig>(
  'createComment',
  async ({ id, ...rest }, { dispatch, extra: api }) => {

    const { data: comments } = await api.post<Comments>(`${APIRoute.Comments}/${id}`, rest);

    dispatch(setComments(comments));
  }
);

export {
  fetchOffers,
  checkAuth,
  authenticateUser,
  logUserOut,
  fetchOffer,
  fetchNearOffers,
  fetchComments,
  createComment
};
