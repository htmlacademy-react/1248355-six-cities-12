import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';

const getActiveOfferId = (state: RootState) => state[NameSpace.Cities].activeOfferId;
const getFilteredOffers = (state: RootState) => state[NameSpace.Cities].filteredOffers;
const getSortedOffers = (state: RootState) => state[NameSpace.Cities].sortedOffers;

export { getActiveOfferId, getSortedOffers, getFilteredOffers };
