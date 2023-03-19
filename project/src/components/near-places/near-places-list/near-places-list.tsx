import React from 'react';
import { OfferCardVariant } from '../../../consts/enum';
import OfferCard from '../../offer-card/offer-card';
import PlacesList from '../../places-list/places-list';
import { useAppSelector } from '../../../hooks/store';

const NearPlacesList = () => {
  const { nearOffers } = useAppSelector((state) => state);

  return (
    <PlacesList className="near-places__list">
      {nearOffers?.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={OfferCardVariant.Offer}
        />))}
    </PlacesList>
  );
};

export default NearPlacesList;
