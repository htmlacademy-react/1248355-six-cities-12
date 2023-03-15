import React from 'react';
import { Offer } from '../../../types/offers';
import { OfferCardVariant } from '../../../consts/enum';
import OfferCard from '../../offer-card/offer-card';

type FavoritePlacesProps = {
  offers: Offer[];
}

const FavoritePlaces = ({ offers }: FavoritePlacesProps) => (
  <div className="favorites__places">
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        variant={OfferCardVariant.Favorites}
      />))}
  </div>
);

export default FavoritePlaces;
