import { NameSpace } from '../../../consts/enum';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers, initOfferActions } from '../../middlewares/thunk/thunk-actions';

type InitialState = {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: true
};

const dataStatusSlice = createSlice({
  name: NameSpace.DataStatus,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initOfferActions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initOfferActions.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initOfferActions.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export { dataStatusSlice };
