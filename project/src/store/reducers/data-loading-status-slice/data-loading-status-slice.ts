import { NameSpace } from '../../../consts/enum';
import { createSlice } from '@reduxjs/toolkit';
import { createComment, fetchOffers, initOfferActions } from '../../middlewares/thunk/thunk-actions';

type InitialState = {
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  isLoading: true,
  isError: false
};

const dataLoadingStatusSlice = createSlice({
  name: NameSpace.DataStatus,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initOfferActions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(initOfferActions.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initOfferActions.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOffers.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createComment.pending, (state) => {
        state.isError = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.isError = true;
      });
  }
});

export { dataLoadingStatusSlice };
