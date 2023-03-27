import { RATING_STARS_COUNT } from '../consts/app';
import { Offer, Offers } from '../types/offers';

const adaptRatingForRendering = (rating: number) => Math.round(rating) * 100 / RATING_STARS_COUNT;

const getLocations = (offers: Offers = []) => offers.map((offer) => ({ ...offer.location, id: offer.id }));

const getLocationsWithActiveOffer = (offers: Offers = [], activeOffer: Offer) =>
  offers.map((offer) => ({ ...offer.location, id: offer.id }))
    .concat({ id: activeOffer.id, ...activeOffer.location });

export { adaptRatingForRendering, getLocations, getLocationsWithActiveOffer };
