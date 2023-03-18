import { FilteredOffer } from '../types/offers';
import { Comment } from '../types/comments';
import dayjs from 'dayjs';

const sortCitiesByAlphabet = (offer1: FilteredOffer, offer2: FilteredOffer) => offer1.city.localeCompare(offer2.city);

const sortReviewsByDate = (review1: Comment, review2: Comment) => {
  const dateA = review1.date;
  const dateB = review2.date;

  return dayjs(dateB).diff(dateA);
};

export { sortCitiesByAlphabet, sortReviewsByDate };
