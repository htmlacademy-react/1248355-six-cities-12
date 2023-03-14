import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/offers';
import Favorites from '../../components/favorites/favorites';
import { useMemo } from 'react';

type FavoritesScreenProps = {
  offers: Offers;
}

const FavoritesScreen = ({ offers }: FavoritesScreenProps) => {
  const filterOffers = useMemo(() => offers.filter(({ isFavorite }) => isFavorite), [offers]);

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <Favorites offers={filterOffers}/>
      </div>
    </main>
  );
};

export default FavoritesScreen;
