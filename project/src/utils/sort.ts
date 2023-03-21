import { FilteredOffer, Offer } from '../types/offers';
import { Comment } from '../types/comments';
import dayjs from 'dayjs';
import { SortType } from '../consts/enum';

const sortCitiesByAlphabet = (offer1: FilteredOffer, offer2: FilteredOffer) => offer1.city.localeCompare(offer2.city);

const sortReviewsByDate = (review1: Comment, review2: Comment) => {
  const dateA = review1.date;
  const dateB = review2.date;

  return dayjs(dateB).diff(dateA);
};

const sortBy = {
  [SortType.LowToHigh]: (offer1: Offer, offer2: Offer) => offer1.price - offer2.price,
  [SortType.HighToLow]: (offer1: Offer, offer2: Offer) => offer2.price - offer1.price,
  [SortType.RatedFirst]: (offer1: Offer, offer2: Offer) => offer2.rating - offer1.rating
};

export { sortCitiesByAlphabet, sortReviewsByDate, sortBy };
