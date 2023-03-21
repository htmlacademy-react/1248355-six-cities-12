import NearPlacesList from './near-places-list/near-places-list';
import Places from '../places/places';

const NearPlaces = () => (
  <Places className="near-places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <NearPlacesList/>
  </Places>
);

export default NearPlaces;
