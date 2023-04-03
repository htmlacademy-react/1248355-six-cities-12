import { NameSpace } from '../../../consts/enum';
import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offers';
import { createComment, initOfferActions } from '../../middlewares/thunk/thunk-actions';
import { Comments } from '../../../types/comments';

type InitialState = {
  offer: Offer | null;
  nearOffers: Offer[];
  comments: Comments;
}

const initialState: InitialState = {
  nearOffers: [],
  comments: [],
  offer: null
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initOfferActions.fulfilled, (state, action) => {
        const { nearOffers, offer, comments } = action.payload;

        state.nearOffers = nearOffers;
        state.offer = offer;
        state.comments = comments;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export { offerSlice, initialState };
