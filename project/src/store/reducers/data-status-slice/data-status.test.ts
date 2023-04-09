import { dataStatusSlice } from './data-status-slice';
import { fetchOffers, initOffer } from '../../middlewares/thunk/thunk-actions';

describe('Slice: dataStatus', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataStatusSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ isLoading: true });
  });

  it('should set isLoading flag if initOfferActions fulfilled', () => {
    expect(dataStatusSlice.reducer({ isLoading: true }, { type: initOffer.fulfilled.type }))
      .toEqual({ isLoading: false });
  });

  it('should set isLoading flag if initOfferActions pending', () => {
    expect(dataStatusSlice.reducer({ isLoading: false }, { type: initOffer.pending.type }))
      .toEqual({ isLoading: true });
  });

  it('should set isLoading flag if initOfferActions rejected', () => {
    expect(dataStatusSlice.reducer({ isLoading: true }, { type: fetchOffers.rejected.type }))
      .toEqual({ isLoading: false });
  });

  it('should set isLoading flag if fetchOffers fulfilled', () => {
    expect(dataStatusSlice.reducer({ isLoading: true }, { type: fetchOffers.fulfilled.type }))
      .toEqual({ isLoading: false });
  });

  it('should set isLoading flag if fetchOffers pending', () => {
    expect(dataStatusSlice.reducer({ isLoading: false }, { type: fetchOffers.pending.type }))
      .toEqual({ isLoading: true });
  });

  it('should set isLoading flag if fetchOffers rejected', () => {
    expect(dataStatusSlice.reducer({ isLoading: true }, { type: fetchOffers.rejected.type }))
      .toEqual({ isLoading: false });
  });
});
