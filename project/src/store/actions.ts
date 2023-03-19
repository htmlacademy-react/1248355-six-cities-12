import { createAction } from '@reduxjs/toolkit';
import { City } from '../consts/enum';
import { Offer } from '../types/offers';

const setCity = createAction<City>('setCity');

const setActiveOffer = createAction<Offer>('setActiveOffer');

const setCityOffers = createAction('setCityOffers');

const setExternalVisit = createAction<boolean>('setExternalVisit');

export { setCity, setCityOffers, setActiveOffer, setExternalVisit };
