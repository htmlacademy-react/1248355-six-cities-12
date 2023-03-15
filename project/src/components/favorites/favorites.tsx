import { Offers as OffersType } from '../../types/offers';
import FavoritesList from './favorites-list/favorites-list';

type FavoritesProps = {
  offers: OffersType;
}

const Favorites = ({ offers }: FavoritesProps) => (
  <section className="favorites">
    <h1 className="favorites__title">Saved listing</h1>
    <FavoritesList offers={offers}/>
  </section>
);

export default Favorites;
