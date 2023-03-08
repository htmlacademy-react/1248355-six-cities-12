import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import { Navigate, useParams } from 'react-router-dom';
import { Offers as OffersType } from '../../types/offers';
import BookmarkButton from '../../components/button/bookmark-button/bookmark-button';
import Rating from '../../components/offer/rating/rating';
import Offers from '../../components/offer/offers/offers';
import Host from '../../components/offer/host/host';
import Reviews from '../../components/offer/reviews/reviews';
import OfferFeatures from '../../components/offer/features/offer-features';
import Mark from '../../components/offer/mark/mark';
import Price from '../../components/offer/price/price';
import Goods from '../../components/offer/goods/goods';
import Gallery from '../../components/offer/gallery/gallery';
import { Comments } from '../../types/comments';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OffersType;
  comments: Comments;
}

const OfferScreen = ({ authorizationStatus, offers, comments }: OfferScreenProps) => {
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const { id } = useParams();
  const offer = id && offers.find((it) => it.id === +id);

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
    <main className="page__main page__main--property">
      <Helmet>
        <title>Property</title>
      </Helmet>
      <section className="property">
        <div className="property__gallery-container container">
          <Gallery images={images} type={type}/>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && <Mark block={Block.Property}/>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{title}</h1>
              <BookmarkButton isActive={isFavorite} variant={BookmarkButtonVariant.Offer}/>
            </div>
            <Rating block={Block.Property} rating={rating}/>
            <OfferFeatures features={{ type, bedrooms, maxAdults }}/>
            <Price price={price} block={Block.Property}/>
            <Goods goods={goods}/>
            <Host host={{ ...host, description }}/>
            <Reviews comments={comments} isAuthorized={isAuthorized}/>
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <Offers offers={offers} variant={OfferCardVariant.Offer}/>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OfferScreen;
