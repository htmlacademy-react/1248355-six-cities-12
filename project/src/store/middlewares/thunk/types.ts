import { AppDispatch, RootState } from '../../../types/store';
import { AxiosInstance } from 'axios';
import { Offer, Offers } from '../../../types/offers';
import { Comments } from '../../../types/comments';
import { City } from '../../../consts/enum';
import { AuthUser } from '../../../types/app';

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
