import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/store';
import { AxiosInstance } from 'axios';
import { Offer, Offers } from '../types/offers';
import { APIRoute, AuthorizationStatus, City } from '../consts/enum';
import { changeAuthStatus, redirectBack, setLoading, setUser } from './reducers/api-reducer/api-actions';
import { Login } from '../types/app';
import { AuthUser, Comments, NewComment } from '../types/comments';
import { removeToken, setToken } from '../services/token';
import { changeActiveOffer, filterCityOffers, setCityOffers, setNearOffers } from './reducers/offers/offers-actions';
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

const createComment = createAsyncThunk<void, NewComment, ThunkConfig>(
  'createComment',
  async ({ id, ...rest }, { dispatch, extra: api }) => {

    const { data: comments } = await api.post<Comments>(`${APIRoute.Comments}/${id}`, rest);

    dispatch(setComments(comments));
  }
);

const initOfferActions = createAsyncThunk<Offer, string, ThunkConfig>(
  'initOfferActions',
  async (id, { dispatch, extra: api }) => {
    const [offerResponse, commentsResponse, nearOffersResponse] =
      await Promise.all([
        api.get<Offer>(`${APIRoute.Offers}/${id}`),
        api.get<Comments>(`${APIRoute.Comments}/${id}`),
        api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`)]);

    dispatch(setComments(commentsResponse.data));
    dispatch(setNearOffers(nearOffersResponse.data));
    dispatch(changeActiveOffer(offerResponse.data));
    dispatch(setLoading(false));
    return offerResponse.data;
  });

export {
  fetchOffers,
  checkAuth,
  authenticateUser,
  logUserOut,
  initOfferActions,
  createComment
};
