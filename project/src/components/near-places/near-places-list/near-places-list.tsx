import React from 'react';
import { OfferCardVariant } from '../../../consts/enum';
import OfferCard from '../../offer-card/offer-card';
import { Offer } from '../../../types/offers';
import PlacesList from '../../places-list/places-list';

type NearPlacesListProps = {
  offers: Offer[];
}

const NearPlacesList = ({ offers }: NearPlacesListProps) => (
  <PlacesList className="near-places__list">
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        variant={OfferCardVariant.Offer}
      />))}
  </PlacesList>
);

export default NearPlacesList;
