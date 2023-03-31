import React, { useMemo } from 'react';
import { AppRoute } from '../../../consts/enum';
import { filterOffersByCity } from '../../../utils/filter';
import { sortCitiesByAlphabet } from '../../../utils/sort';
import FavoritePlaces from '../favorite-places/favorite-places';
import { useAppSelector } from '../../../hooks/store';
import { getFilteredOffers } from '../../../store/reducers/cities-slice/selectors';

const FavoritesList = () => {
  const offers = useAppSelector(getFilteredOffers);
  const filteredOffers = useMemo(() => filterOffersByCity(offers).sort(sortCitiesByAlphabet), [offers]);

  return (
    <ul className="favorites__list">
      {
        filteredOffers.map(({ city, cityOffers }) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href={AppRoute.Root}>
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <FavoritePlaces offers={cityOffers}/>
          </li>
        ))
      }
    </ul>

  );
};

export default FavoritesList;
