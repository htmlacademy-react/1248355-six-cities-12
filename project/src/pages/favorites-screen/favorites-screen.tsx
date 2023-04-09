import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks/store';
import { getFilteredFavorites, getUserStatus } from '../../store/reducers/user-slice/selectors';
import { AuthorizationStatus } from '../../consts/enum';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import React from 'react';

const FavoritesScreen = () => {
  const authStatus = useAppSelector(getUserStatus);
  const filteredFavorites = useAppSelector(getFilteredFavorites);

  return (
    <Spinner isActive={authStatus === AuthorizationStatus.Unknown}>
      {filteredFavorites.length
        ?
        <main className="page__main page__main--favorites">
          <Helmet>
            <title>Favorites</title>
          </Helmet>
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favorites={filteredFavorites}/>
            </section>
          </div>
        </main>
        : <FavoritesEmptyScreen/>}
    </Spinner>
  );
};

export default FavoritesScreen;
