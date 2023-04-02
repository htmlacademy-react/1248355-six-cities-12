import { AppRoute } from '../../consts/enum';
import FavoritePlaces from './favorite-places/favorite-places';
import { FilteredOffer } from '../../types/offers';
import { generatePath, Link } from 'react-router-dom';

type FavoritesListProps = {
  favorites: FilteredOffer[];
}

const FavoritesList = ({ favorites }: FavoritesListProps) => (
  <ul className="favorites__list">
    {
      favorites.map(({ city, cityOffers }) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={generatePath(AppRoute.City, { city })}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <FavoritePlaces offers={cityOffers}/>
        </li>
      ))
    }
  </ul>

);

export default FavoritesList;
