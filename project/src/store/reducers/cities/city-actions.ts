import { createAction } from '@reduxjs/toolkit';
import { City, SortType } from '../../../consts/enum';
import { Offer, Offers } from '../../../types/offers';

const changeCity = createAction('cities/changeCity');

const setCityOffers = createAction<Offers>('cities/setCityOffers');

const sortCities = createAction<SortType>('cities/sortCities');

const changeActiveOffer = createAction<Offer>('cities/changeActiveOffer');

const filterCityOffers = createAction<City>('cities/filterCityOffers');

export {
  changeCity,
  filterCityOffers,
  changeActiveOffer,
  sortCities,
  setCityOffers
};
