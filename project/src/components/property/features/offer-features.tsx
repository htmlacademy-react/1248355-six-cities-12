import { makeFirstLetterUpperCase } from '../../../utils/common';
import { Offer } from '../../../types/offers';

type FeaturesProps = {
  features: Pick<Offer, 'type' | 'maxAdults' | 'bedrooms'>;
}

const OfferFeatures = ({ features: { maxAdults, type, bedrooms } }: FeaturesProps) => (
  <ul className="property__features">
    <li className="property__feature property__feature--entire">
      {makeFirstLetterUpperCase(type)}
    </li>
    <li className="property__feature property__feature--bedrooms">
      {bedrooms} Bedrooms
    </li>
    <li className="property__feature property__feature--adults">
      Max {maxAdults} adults
    </li>
  </ul>
);

export default OfferFeatures;
