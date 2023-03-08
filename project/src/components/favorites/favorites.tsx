import Offers from '../offer/offers/offers';
import { OfferCardVariant } from '../../consts/enum';
import { Offers as OffersType } from '../../types/offers';
import { filterOffersByCity } from '../../utils/filter';
import { sortCitiesByAlphabet } from '../../utils/sort';
import { useMemo } from 'react';

type FavoritesProps = {
  offers: OffersType;
}

const Favorites = ({ offers }: FavoritesProps) => {
  const filteredOffers = useMemo(() => filterOffersByCity(offers).sort(sortCitiesByAlphabet), [offers]);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          filteredOffers.map(({ city, cityOffers }) => (
            <li key={city} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="/">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <Offers variant={OfferCardVariant.Favorites} offers={cityOffers}/>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default Favorites;
