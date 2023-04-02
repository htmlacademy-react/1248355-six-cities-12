import React from 'react';
import { useAppSelector } from '../../hooks/store';
import { getFavorites } from '../../store/reducers/user-slice/selectors';

const FavoritesCount = () => {
  const favorites = useAppSelector(getFavorites);

  return (
    <span className="header__favorite-count">{favorites.length}</span>
  );
};

export default FavoritesCount;
