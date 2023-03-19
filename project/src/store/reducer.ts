import { createReducer } from '@reduxjs/toolkit';
import { City } from '../consts/enum';
import { setActiveOffer, setCity, setCityOffers, setExternalVisit } from './actions';
import { Offer } from '../types/offers';
import { offers } from '../mocks/offers';
import { filter } from '../utils/filter';

type InitialState = {
  city?: City;
  offers: Offer[];
  activeOffer?: Offer;
  nearOffers?: Offer[];
  isExternalVisit: boolean;
}

const initialState: InitialState = {
  isExternalVisit: true,
  offers: offers,
  nearOffers: offers
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
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setExternalVisit, (state, action) => {
      state.isExternalVisit = action.payload;
    });

});

export { reducer };
