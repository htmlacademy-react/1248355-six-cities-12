import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';

const getNearOffers = (state: RootState) => state[NameSpace.Offer].nearOffers;
const getOffer = (state: RootState) => state[NameSpace.Offer].offer;
const getComments = (state: RootState) => state[NameSpace.Offer].comments;

export { getOffer, getNearOffers, getComments };
