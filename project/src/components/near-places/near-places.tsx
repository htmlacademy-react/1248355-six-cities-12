import { Offer } from '../../types/offers';
import NearPlacesList from './near-places-list/near-places-list';
import Places from '../places/places';

type NearPlacesProps = {
  offers: Offer [];
}

const NearPlaces = ({ offers }: NearPlacesProps) => (
  <Places className="near-places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <NearPlacesList offers={offers}/>
  </Places>
);

export default NearPlaces;
