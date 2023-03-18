import Gallery from './gallery/gallery';
import { AuthorizationStatus, Block } from '../../consts/enum';
import Rating from '../rating/rating';
import OfferFeatures from './features/offer-features';
import Price from '../price/price';
import Goods from './goods/goods';
import Host from './host/host';
import Reviews from './reviews/reviews';
import { Navigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Offers as OffersType } from '../../types/offers';
import { Comments } from '../../types/comments';
import GalleryContainer from './container/gallery-container/gallery-container';
import PropertyContainer from './container/property-container/property-container';
import Map from '../map/map';
import { locations } from '../../mocks/locations';

type PropertyProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OffersType;
  comments: Comments;
}

const MAX_NEAR_PLACES_COUNT = 3;

const Property = ({ offers, comments, authorizationStatus }: PropertyProps) => {
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const { id } = useParams();
  const offer = useMemo(() => id && offers.find((it) => it.id === +id), [id, offers]);

  const nearPoints = useMemo(() => {
    const points = [...locations.slice(0, MAX_NEAR_PLACES_COUNT)];
    const isPointInPoints = offer && points.some((point) => point.id === offer.id);

    return isPointInPoints && offer ? [...points, {
      ...offer.city.location,
      id: offer.id
    }] : points;
  }, [offer]);

  if (!offer) {
    return <Navigate to="*"/>;
  }

  const {
    images,
    type,
    isPremium,
    title,
    isFavorite,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description
  } = offer;

  return (
    <section className="property">
      <GalleryContainer>
        <Gallery images={images} type={type}/>
      </GalleryContainer>
      <PropertyContainer data={{ isFavorite, title, isPremium }}>
        <Rating block={Block.Property} rating={rating}/>
        <OfferFeatures features={{ type, bedrooms, maxAdults }}/>
        <Price price={price} block={Block.Property}/>
        <Goods goods={goods}/>
        <Host host={{ ...host, description }}/>
        <Reviews comments={comments} isAuthorized={isAuthorized}/>
      </PropertyContainer>
      <Map block={Block.Property} city={offers[0].city} points={nearPoints} activeCard={offer.id}/>
    </section>
  );
};

export default Property;
