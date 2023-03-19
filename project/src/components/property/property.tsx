import Gallery from './gallery/gallery';
import { AuthorizationStatus, Block } from '../../consts/enum';
import Rating from '../rating/rating';
import OfferFeatures from './features/offer-features';
import Price from '../price/price';
import Goods from './goods/goods';
import Host from './host/host';
import Reviews from './reviews/reviews';
import { Comments } from '../../types/comments';
import GalleryContainer from './container/gallery-container/gallery-container';
import PropertyContainer from './container/property-container/property-container';
import Map from '../map/map';
import { useAppSelector } from '../../hooks/store';
import ErrorNavigate from '../navigate/error-navigate/error-navigate';

type PropertyProps = {
  authorizationStatus: AuthorizationStatus;
  comments: Comments;
}

const Property = ({ comments, authorizationStatus }: PropertyProps) => {
  const { activeOffer } = useAppSelector((state) => state);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  if (!activeOffer) {
    return <ErrorNavigate/>;
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
  } = activeOffer;

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
      <Map block={Block.Property}/>
    </section>
  );
};

export default Property;
