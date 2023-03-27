import { SortType } from '../../../consts/enum';
import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offers';
import { changeActiveOffer, filterCityOffers, setCityOffers, setNearOffers, sortCityOffers } from './offers-actions';
import { filter } from '../../../utils/filter';
import { sortBy } from '../../../utils/sort';

type InitialState = {
  offers: Offer[];
  activeOffer: Offer | null;
  nearOffers: Offer[];
  sourceOffers: Offer[];
}

const initialState: InitialState = {
  offers: [],
  nearOffers: [],
  sourceOffers: [],
  activeOffer: null
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityOffers, (state, action) => {
      state.sourceOffers = action.payload;
    })
    .addCase(setNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(filterCityOffers, (state, action) => {
      state.offers = filter[action.payload](state.sourceOffers);

    })
    .addCase(sortCityOffers, (state, action) => {
      if (action.payload === SortType.Popular) {
        state.offers = filter[state.offers[0].city.name](state.sourceOffers);

        return;
      }

      state.offers = state.offers.sort(sortBy[action.payload]);
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export { offersReducer };
