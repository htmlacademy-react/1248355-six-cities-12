import { FilteredOffer, Offers } from '../types/offers';
import { City } from '../consts/enum';

const filter = {
  [City.Paris]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Paris),
  [City.Amsterdam]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Amsterdam),
  [City.Brussels]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Brussels),
  [City.Cologne]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Cologne),
  [City.Dusseldorf]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Dusseldorf),
  [City.Hamburg]: (offers: Offers) => offers.filter((offer) => offer.city.name === City.Hamburg)
};

const filterOffersByCity = (offers: Offers) =>
  Object.values(City)
    .reduce<FilteredOffer[]>((filteredOffers, city) => {
      const cityOffers = filter[city](offers);

      return cityOffers.length ? [...filteredOffers, { city, cityOffers }] : filteredOffers;
    }, []);

export { filterOffersByCity, filter };
