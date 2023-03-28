import React from 'react';
import OfferCard from '../offer-card/offer-card';
import { OfferCardVariant } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';

const CitiesList = () => {
  const sortedOffers = useAppSelector((state) => state.city.sortedOffers);

  return (
    <div className="cities__places-list tabs__content places__list">
      {sortedOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={OfferCardVariant.Cities}
        />))}
    </div>
  );
};

export default CitiesList;
