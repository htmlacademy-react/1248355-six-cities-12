import { AppDispatch, RootState } from './store';
import { AxiosInstance } from 'axios';
import { Offer, Offers } from './offers';
import { Comments } from './comments';
import { City } from '../consts/enum';
import { AuthUser } from './app';

export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

export type InitOfferActions = {
  offer: Offer;
  comments: Comments;
  nearOffers: Offers;
}

export type FetchOffers = {
  city: City;
  offers: Offers;
}

export type CheckedUser = {
  user: AuthUser;
  favorites: Offers;
}
