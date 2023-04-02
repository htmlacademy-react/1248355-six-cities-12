import { AppRoute, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import { Offer } from '../../types/offers';
import { OfferVariant } from '../../types/app';
import Mark from '../mark/mark';
import classNames from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { makeFirstLetterUpperCase } from '../../utils/common';
import BookmarkButton from '../button/bookmark-button/bookmark-button';
import Price from '../price/price';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks/store';

import React from 'react';
import { changeActiveOffer } from '../../store/reducers/cities-slice/cities-slice';

type PlaceCardProps = {
  variant: OfferVariant;
  offer: Offer;
}

const OfferCard = ({ variant, offer }: PlaceCardProps) => {
  const { block, imgSize } = variant;
  const { isFavorite, isPremium, previewImage, title, type, rating, price, id } = offer;

  const isFavoriteVariant = OfferCardVariant.Favorites === variant;
  const isMouseEnterEvent = OfferCardVariant.Cities === variant || undefined;

  const dispatch = useAppDispatch();

  const handleActiveOffer = () => {
    dispatch(changeActiveOffer(offer.id));
  };

  return (
    <article
      onMouseEnter={isMouseEnterEvent && handleActiveOffer}
      className={`${block}__card place-card`}
    >
      {isPremium && <Mark block={Block.OfferCard}/>}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id: id.toString() })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgSize.width}
            height={imgSize.height}
            alt={`Place ${title}`}
          />
        </Link>
      </div>
      <div className={classNames('place-card__info', { 'favorites__card-info': isFavoriteVariant })}>
        <div className="place-card__price-wrapper">
          <Price price={price} block={Block.OfferCard}/>
          <BookmarkButton
            variant={BookmarkButtonVariant.Card}
            isFavorite={isFavorite}
            id={id}
          />
        </div>
        <Rating block={Block.OfferCard} rating={rating}/>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: id.toString() })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">
          {makeFirstLetterUpperCase(type)}
        </p>
      </div>
    </article>
  );
};

export default React.memo(OfferCard);
