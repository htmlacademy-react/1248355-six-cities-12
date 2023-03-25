import { RATING_STARS_COUNT } from '../consts/app';
import { Offers } from '../types/offers';

const adaptRatingForRendering = (rating: number) => Math.round(rating) * 100 / RATING_STARS_COUNT;

const mapOffersToLocation = (offers: Offers = []) => offers.map((offer) => ({ ...offer.location, id: offer.id }));

export { adaptRatingForRendering, mapOffersToLocation };
