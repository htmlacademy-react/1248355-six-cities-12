import { Offer, Offers } from '../types/offers';
import { MaxElementCountOnScreen } from '../consts/enum';

const adaptRatingForRendering = (rating: number) => Math.round(rating) * 100 / MaxElementCountOnScreen.RatingStar;

const getLocations = (offers: Offers = []) => offers.map((offer) => ({ ...offer.location, id: offer.id }));

const getLocationsWithActiveOffer = (offers: Offers = [], activeOffer: Offer) =>
  offers.map((offer) => ({ ...offer.location, id: offer.id }))
    .concat({ id: activeOffer.id, ...activeOffer.location });

export { adaptRatingForRendering, getLocations, getLocationsWithActiveOffer };
