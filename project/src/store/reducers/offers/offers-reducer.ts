import { SortType } from '../../../consts/enum';
import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offers';
import { changeActiveOffer, filterCityOffers, setCityOffers, setNearOffers, sortCityOffers } from './offers-actions';
import { filter } from '../../../utils/filter';
import { sortBy } from '../../../utils/sort';

type InitialState = {
  offers: Offer[];
  sortedOffers: Offer[];
  activeOffer: Offer | null;
  nearOffers: Offer[];
  sourceOffers: Offer[];
}

const initialState: InitialState = {
  offers: [],
  nearOffers: [],
  sourceOffers: [],
  sortedOffers: [],
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
      state.sortedOffers = state.offers;

    })
    .addCase(sortCityOffers, (state, action) => {
      if (action.payload === SortType.Popular) {
        state.sortedOffers = state.offers;

        return;
      }

      state.sortedOffers = state.sortedOffers.sort(sortBy[action.payload]);
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export { offersReducer };
