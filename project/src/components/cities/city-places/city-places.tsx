import React from 'react';
import Sort from '../../form/sort/sort';
import CityList from '../cities-list/city-list';
import Places from '../../places/places';
import { useAppSelector } from '../../../hooks/store';

const CityPlaces = () => {
  const { city, offers } = useAppSelector((state) => state);

  return (
    <Places className="cities__places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city}</b>
      <Sort/>
      <CityList offers={offers}/>
    </Places>
  );
};

export default CityPlaces;
