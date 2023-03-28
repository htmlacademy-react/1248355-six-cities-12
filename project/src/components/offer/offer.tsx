import React, { ReactNode } from 'react';
import { createRandomElementsArray, makeFirstLetterUpperCase } from '../../utils/common';
import { OFFER_SCREEN_IMG_COUNT } from '../../consts/app';
import Mark from '../mark/mark';
import { Block, BookmarkButtonVariant } from '../../consts/enum';
import BookmarkButton from '../button/bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import Price from '../price/price';
import { useAppSelector } from '../../hooks/store';
import Reviews from '../reviews/reviews';

type OfferProps = {
  children: ReactNode;
}

const Offer = ({ children }: OfferProps) => {
  const offer = useAppSelector((state) => state.city.activeOffer);

  if (!offer) {
    return null;
  }

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {createRandomElementsArray(offer.images, OFFER_SCREEN_IMG_COUNT)
            .map(((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt={offer.type}/>
              </div>
            )))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {offer.isPremium && <Mark block={Block.Property}/>}
          <div className="property__name-wrapper">
            <h1 className="property__name">{offer.title}</h1>
            <BookmarkButton isActive={offer.isFavorite} variant={BookmarkButtonVariant.Offer}/>
          </div>
          <Rating block={Block.Property} rating={offer.rating}/>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {makeFirstLetterUpperCase(offer.type)}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {offer.maxAdults} adults
            </li>
          </ul>
          <Price price={offer.price} block={Block.Property}/>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {offer.goods.map((good) => (
                <li key={good} className="property__inside-item">
                  {good}
                </li>))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="property__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="property__user-name">
                {offer.host.name}
              </span>
              {offer.host.isPro && <span className="property__user-status">&apos;Pro&apos;</span>}
            </div>
            <div className="property__description">
              <p className="property__text">
                {offer.description}
              </p>
            </div>
          </div>
          <Reviews offer={offer}/>
        </div>
      </div>
      {children}
    </section>
  );
};

export default Offer;
