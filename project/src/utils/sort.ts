import { FilteredOffer } from '../types/offers';

const sortCitiesByAlphabet = (offer1: FilteredOffer, offer2: FilteredOffer) => offer1.city.localeCompare(offer2.city);

export { sortCitiesByAlphabet };
