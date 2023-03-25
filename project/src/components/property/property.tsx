import { AuthorizationStatus, Block, BookmarkButtonVariant } from '../../consts/enum';
import Rating from '../rating/rating';
import OfferFeatures from './features/offer-features';
import Price from '../price/price';
import Goods from './goods/goods';
import Host from './host/host';
import { Comments } from '../../types/comments';
import Map from '../map/map';
import { useAppSelector } from '../../hooks/store';
import ErrorNavigate from '../navigate/error-navigate/error-navigate';
import Container from '../container/container';
import React from 'react';
import Mark from '../mark/mark';
import BookmarkButton from '../button/bookmark-button/bookmark-button';
import { createRandomElementsArray } from '../../utils/common';
import { OFFER_SCREEN_IMG_COUNT } from '../../consts/app';
import ReviewsList from './reviews/reviews-list/reviews-list';
import ReviewForm from '../form/review/review-form';

type PropertyProps = {
  authorizationStatus: AuthorizationStatus;
  comments: Comments;
}

const Property = ({ comments, authorizationStatus }: PropertyProps) => {
  const activeOffer = useAppSelector((state) => state.city.activeOffer);
  const offers = useAppSelector((state) => state.city.offers);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  if (!activeOffer) {
    return <ErrorNavigate/>;
  }

  return (
    <section className="property">
      <Container className="property__gallery-container">
        <div className="property__gallery">
          {createRandomElementsArray(activeOffer.images, OFFER_SCREEN_IMG_COUNT).map(((image) => (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt={activeOffer.type}/>
            </div>
          )))}
        </div>
      </Container>
      <Container className="property__container">
        <div className="property__wrapper">
          {activeOffer.isPremium && <Mark block={Block.Property}/>}
          <div className="property__name-wrapper">
            <h1 className="property__name">{activeOffer.title}</h1>
            <BookmarkButton isActive={activeOffer.isFavorite} variant={BookmarkButtonVariant.Offer}/>
          </div>
          <Rating block={Block.Property} rating={activeOffer.rating}/>
          <OfferFeatures features={activeOffer}/>
          <Price price={activeOffer.price} block={Block.Property}/>
          <Goods goods={activeOffer.goods}/>
          <Host host={{ ...activeOffer.host, description: activeOffer.description }}/>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span>
            </h2>
            <ReviewsList comments={comments}/>
            {isAuthorized && <ReviewForm/>}
          </section>
        </div>
      </Container>
      <Map offers={offers} block={Block.Property}/>
    </section>
  );
};

export default Property;
