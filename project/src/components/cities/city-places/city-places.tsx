import React from 'react';
import Sort from '../../form/sort/sort';
import CityList from '../cities-list/city-list';
import { Offer } from '../../../types/offers';
import Places from '../../places/places';

type CityPlacesProps = {
  offers: Offer[];
  onMouseEnter: (id: number) => void;
}

const CityPlaces = ({ offers, onMouseEnter }: CityPlacesProps) => (
  <Places className="cities__places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in Amsterdam</b>
    <Sort/>
    <CityList onMouseEnter={onMouseEnter} offers={offers}/>
  </Places>
);

export default CityPlaces;
