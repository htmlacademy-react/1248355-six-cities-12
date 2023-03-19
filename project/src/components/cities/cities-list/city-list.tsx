import React from 'react';
import { OfferCardVariant } from '../../../consts/enum';
import { Offer } from '../../../types/offers';
import OfferCard from '../../offer-card/offer-card';
import PlacesList from '../../places-list/places-list';

type CityListProps = {
  offers: Offer[];
}

const CityList = ({ offers }: CityListProps) => (
  <PlacesList className="cities__places-list tabs__content">
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        variant={OfferCardVariant.Cities}
      />))}
  </PlacesList>
);

export default CityList;
