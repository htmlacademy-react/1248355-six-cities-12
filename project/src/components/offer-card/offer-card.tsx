import { AppRoute, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import { Offer } from '../../types/offers';
import { OfferVariant } from '../../types/components';
import Mark from '../mark/mark';
import BookmarkButton from '../button/bookmark-button/bookmark-button';
import { makeFirstLetterUpperCase } from '../../utils/common';
import Rating from '../rating/rating';
import { generatePath, Link } from 'react-router-dom';
import Price from '../price/price';

type PlaceCardProps = {
  variant: OfferVariant;
  offer: Offer;
  onMouseEnter?: (activeCard: number) => void;
}

const OfferCard = ({ variant, offer, onMouseEnter }: PlaceCardProps) => {
  const { block, imgSize } = variant;
  const { isFavorite, isPremium, previewImage, title, type, rating, price, id } = offer;
  const isFavoriteVariant = OfferCardVariant.Favorites === variant;

  return (
    <article onMouseEnter={onMouseEnter && (() => onMouseEnter(id))} className={`${block}__card place-card`}>
      {isPremium && <Mark block={Block.OfferCard} />}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <a href={AppRoute.Root}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgSize.width}
            height={imgSize.height}
            alt={`Place ${title}`}
          />
        </a>
      </div>
      <div className={`${isFavoriteVariant ? `${block}__card-info` : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <Price price={price} block={Block.OfferCard} />
          <BookmarkButton variant={BookmarkButtonVariant.Card} isActive={isFavorite} />
        </div>
        <Rating block={Block.OfferCard} rating={rating} />
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: id.toString() })}>{title}</Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUpperCase(type)}</p>
      </div>
    </article>
  );
};

export default OfferCard;
