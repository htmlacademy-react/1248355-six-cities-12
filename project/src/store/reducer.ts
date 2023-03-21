import { createReducer } from '@reduxjs/toolkit';
import { City, SortType } from '../consts/enum';
import { setActiveOffer, setCity, setCityOffers, setExternalVisit, sortCities } from './actions';
import { Offer } from '../types/offers';
import { offers } from '../mocks/offers';
import { filter } from '../utils/filter';
import { sortBy } from '../utils/sort';

type InitialState = {
  city?: City;
  offers: Offer[];
  activeOffer?: Offer;
  nearOffers?: Offer[];
  isExternalVisit: boolean;
  sourceOffers: Offer[];
}

const initialState: InitialState = {
  isExternalVisit: true,
  offers: offers,
  nearOffers: offers,
  sourceOffers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setCityOffers, (state) => {
      if (!state.city) {
        return;
      }

      state.offers = filter[state.city](offers);
      state.sourceOffers = state.offers;
    })
    .addCase(sortCities, (state, action) => {
      if (action.payload === SortType.Popular) {
        state.offers = state.sourceOffers;
        return;
      }

      state.offers = state.offers.sort(sortBy[action.payload]);
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setExternalVisit, (state, action) => {
      state.isExternalVisit = action.payload;
    });

});

export { reducer };
