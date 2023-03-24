import { SortType } from '../../../consts/enum';
import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../../../types/offers';
import { changeActiveOffer, changeCity, filterCityOffers, setCityOffers, sortCities } from './city-actions';
import { filter } from '../../../utils/filter';
import { sortBy } from '../../../utils/sort';

type InitialState = {
  city: City | null;
  offers: Offer[];
  activeOffer: Offer | null;
  nearOffers: Offer[];
  sourceOffers: Offer[];
}

const initialState: InitialState = {
  offers: [],
  nearOffers: [],
  sourceOffers: [],
  city: null,
  activeOffer: null,

};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      if (!state.offers.length) {
        return;
      }

      state.city = {
        name: state.offers[0].city.name,
        location: state.offers[0].city.location
      };
    })
    .addCase(setCityOffers, (state, action) => {
      state.sourceOffers = action.payload;
    })
    .addCase(filterCityOffers, (state, action) => {
      state.offers = filter[action.payload](state.sourceOffers);

    })
    .addCase(sortCities, (state, action) => {
      if (!state.city) {
        return;
      }

      if (action.payload === SortType.Popular) {
        state.offers = filter[state.city.name](state.sourceOffers);
        return;
      }

      state.offers = state.offers.sort(sortBy[action.payload]);
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export { cityReducer };
