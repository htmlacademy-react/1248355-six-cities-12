import { createAction } from '@reduxjs/toolkit';
import { City, SortType } from '../../../consts/enum';
import { Offer, Offers } from '../../../types/offers';

const setCityOffers = createAction<Offers>('offers/setCityOffers');

const setNearOffers = createAction<Offers>('offers/setNearOffers');

const sortCityOffers = createAction<SortType>('offers/sortCities');

const changeActiveOffer = createAction<Offer>('offers/changeActiveOffer');

const filterCityOffers = createAction<City>('offers/filterCityOffers');

export {
  filterCityOffers,
  changeActiveOffer,
  sortCityOffers,
  setCityOffers,
  setNearOffers
};
