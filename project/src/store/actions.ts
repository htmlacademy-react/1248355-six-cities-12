import { createAction } from '@reduxjs/toolkit';
import { City, SortType } from '../consts/enum';
import { Offer } from '../types/offers';

const setCity = createAction<City>('setCity');

const setActiveOffer = createAction<Offer>('setActiveOffer');

const setCityOffers = createAction('setCityOffers');

const setExternalVisit = createAction<boolean>('setExternalVisit');

const sortCities = createAction<SortType>('sortCities');

export { setCity, setCityOffers, setActiveOffer, setExternalVisit, sortCities };
