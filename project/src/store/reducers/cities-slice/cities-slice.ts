import { City, NameSpace, SortType } from '../../../consts/enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offers';
import { filter } from '../../../utils/filter';
import { sortBy } from '../../../utils/sort';
import { fetchOffers } from '../../middlewares/thunk/thunk-actions';

type InitialState = {
  sourceOffers: Offer[];
  filteredOffers: Offer[];
  sortedOffers: Offer[];
  activeOfferId: number | null;
}

export const initialState: InitialState = {
  sourceOffers: [],
  filteredOffers: [],
  sortedOffers: [],
  activeOfferId: null
};

const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    changeActiveOffer: (state, action: PayloadAction<number>) => {
      state.activeOfferId = action.payload;
    },
    sortCityOffers: (state, action: PayloadAction<SortType>) => {
      if (action.payload === SortType.Popular) {
        state.sortedOffers = state.filteredOffers;
        return;
      }

      state.sortedOffers = state.sortedOffers.sort(sortBy[action.payload]);
    },
    filterCityOffers: (state, action: PayloadAction<City>) => {
      state.filteredOffers = filter[action.payload](state.sourceOffers);
      state.sortedOffers = state.filteredOffers;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.sourceOffers = action.payload.offers;
        state.filteredOffers = filter[action.payload.city](state.sourceOffers);
        state.sortedOffers = state.filteredOffers;
      });
  }
});

export const { changeActiveOffer, sortCityOffers, filterCityOffers } = citiesSlice.actions;
export { citiesSlice };
