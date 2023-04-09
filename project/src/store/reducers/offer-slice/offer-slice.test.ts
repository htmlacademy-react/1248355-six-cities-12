import { makeFakeComment, makeFakeOffer } from '../../../utils/mocks';
import { initOffer } from '../../middlewares/thunk/thunk-actions';
import { initialState, offerSlice } from './offer-slice';
import { City } from '../../../consts/enum';

describe('Slice: offer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update offer, comments and nearOffers upon loading from the server', () => {
    const offer = makeFakeOffer({ city: City.Paris });
    const nearOffers = [makeFakeOffer({ city: City.Paris }), makeFakeOffer({ city: City.Paris })];
    const comments = [makeFakeComment(), makeFakeComment()];

    expect(offerSlice.reducer(initialState, {
      type: initOffer.fulfilled.type,
      payload: {
        offer,
        comments,
        nearOffers
      }
    }))
      .toEqual({
        ...initialState,
        offer,
        comments,
        nearOffers
      });
  });
});
