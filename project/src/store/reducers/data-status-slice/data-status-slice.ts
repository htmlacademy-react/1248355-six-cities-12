import { NameSpace } from '../../../consts/enum';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers, initOffer } from '../../middlewares/thunk/thunk-actions';

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
      .addCase(initOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initOffer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initOffer.rejected, (state) => {
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
