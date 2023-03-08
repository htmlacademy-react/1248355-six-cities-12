import { Offers as OffersType } from '../../../types/offers';
import OfferCard from './offer-card/offer-card';
import { useState } from 'react';
import { OfferVariant } from '../../../types/components';

type OffersProps = {
  offers: OffersType;
  variant: OfferVariant;
}
const Offers = ({ offers, ...props }: OffersProps) => {
  const [, setActiveCard] = useState<number | null>(null);

  return (
    <>
      {offers.map((offer) => <OfferCard onMouseOver={setActiveCard} key={offer.id} offer={offer} {...props}/>)}
    </>
  );
};

export default Offers;
