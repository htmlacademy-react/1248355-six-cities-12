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
  const activeOffer = useAppSelector((state) => state.activeOffer);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  if (!activeOffer) {
    return <ErrorNavigate/>;
  }

  return (
    <section className="property">
      <GalleryContainer>
        <Gallery images={activeOffer.images} type={activeOffer.type}/>
      </GalleryContainer>
      <PropertyContainer data={activeOffer}>
        <Rating block={Block.Property} rating={activeOffer.rating}/>
        <OfferFeatures features={activeOffer}/>
        <Price price={activeOffer.price} block={Block.Property}/>
        <Goods goods={activeOffer.goods}/>
        <Host host={{ ...activeOffer.host, description: activeOffer.description }}/>
        <Reviews comments={comments} isAuthorized={isAuthorized}/>
      </PropertyContainer>
      <Map block={Block.Property}/>
    </section>
  );
};

export default Property;
