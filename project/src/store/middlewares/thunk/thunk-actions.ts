import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, Offers } from '../../../types/offers';
import { APIRoute, City } from '../../../consts/enum';
import { redirectBack } from '../redirect/actions';
import { AuthUser, Login, UpdateFavorite } from '../../../types/app';
import { Comments, NewComment } from '../../../types/comments';
import { removeToken, setToken } from '../../../services/token';
import { CheckedUser, FetchOffers, InitOfferActions, ThunkConfig } from './types';

const fetchOffers = createAsyncThunk<FetchOffers, City, ThunkConfig>(
  'fetchOffers',
  async (city, { extra: api }) => {
    const { data: offers } = await api.get<Offers>(APIRoute.Offers);

    return {
      city,
      offers
    };
  });

const checkAuth = createAsyncThunk<CheckedUser, undefined, ThunkConfig>(
  'checkAuth',
  async (_args, { extra: api }) => {
    const { data: user } = await api.get<AuthUser>(APIRoute.Login);
    const { data: favorites } = await api.get<Offers>(APIRoute.Favorites);

    return {
      user,
      favorites
    };
  }
);
const authenticateUser = createAsyncThunk<CheckedUser, Login, ThunkConfig>(
  'authenticateUser',
  async (loginData, { dispatch, extra: api }) => {
    const { data: user } = await api.post<NonNullable<AuthUser>>(APIRoute.Login, loginData);

    setToken(user.token);
    const { data: favorites } = await api.get<Offers>(APIRoute.Favorites);

    dispatch(redirectBack());

    return {
      user,
      favorites
    };
  });

const logUserOut = createAsyncThunk<void, undefined, ThunkConfig>(
  'logUserOut',
  async (_args, { extra: api }) => {
    await api.delete(APIRoute.Logout);

    removeToken();
  });

const createComment = createAsyncThunk<Comments, NewComment, ThunkConfig>(
  'createComment',
  async ({ id, ...rest }, { extra: api }) => {

    const { data: comments } = await api.post<Comments>(`${APIRoute.Comments}/${id}`, rest);

    return comments;
  }
);

const initOfferActions = createAsyncThunk<InitOfferActions, string, ThunkConfig>(
  'initOfferActions',
  async (id, { extra: api }) => {
    const [offerResponse, commentsResponse, nearOffersResponse] =
      await Promise.all([
        api.get<Offer>(`${APIRoute.Offers}/${id}`),
        api.get<Comments>(`${APIRoute.Comments}/${id}`),
        api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`)]);

    return {
      offer: offerResponse.data,
      comments: commentsResponse.data,
      nearOffers: nearOffersResponse.data
    };
  });

const updateFavorite = createAsyncThunk<Offer, UpdateFavorite, ThunkConfig>(
  'updateFavorite',
  async ({ id, isFavorite }, { extra: api }) => {

    const { data: offer } = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${Number(isFavorite)}`);

    return offer;
  }
);

export {
  updateFavorite,
  fetchOffers,
  checkAuth,
  authenticateUser,
  logUserOut,
  initOfferActions,
  createComment
};
