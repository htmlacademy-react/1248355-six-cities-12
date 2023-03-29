import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../types/store';
import { AxiosInstance } from 'axios';
import { Offer, Offers } from '../../../types/offers';
import { APIRoute, City } from '../../../consts/enum';
import { redirectBack } from '../redirect/actions';
import { AuthUser, Login } from '../../../types/app';
import { Comments, NewComment } from '../../../types/comments';
import { removeToken, setToken } from '../../../services/token';

type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

type InitOfferActions = {
  offer: Offer;
  comments: Comments;
  nearOffers: Offers;
}

type FetchOffers = {
  city: City;
  offers: Offers;
}

const fetchOffers = createAsyncThunk<FetchOffers, City, ThunkConfig>(
  'fetchOffers',
  async (city, { extra: api }) => {
    const { data: offers } = await api.get<Offers>(APIRoute.Offers);
    return {
      city,
      offers
    };
  });

const checkAuth = createAsyncThunk<AuthUser, undefined, ThunkConfig>(
  'checkAuth',
  async (_args, { extra: api }) => {
    const { data } = await api.get<AuthUser>(APIRoute.Login);

    return data;
  }
);
const authenticateUser = createAsyncThunk<AuthUser, Login, ThunkConfig>(
  'authenticateUser',
  async (loginData, { dispatch, extra: api }) => {
    const { data } = await api.post<NonNullable<AuthUser>>(APIRoute.Login, loginData);

    setToken(data.token);
    dispatch(redirectBack());

    return data;
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

export {
  fetchOffers,
  checkAuth,
  authenticateUser,
  logUserOut,
  initOfferActions,
  createComment
};
