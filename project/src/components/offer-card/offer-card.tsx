import { AppRoute, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import { Offer } from '../../types/offers';
import { OfferVariant } from '../../types/components';
import Mark from '../mark/mark';
import classNames from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { makeFirstLetterUpperCase } from '../../utils/common';
import BookmarkButton from '../button/bookmark-button/bookmark-button';
import Price from '../price/price';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks/store';
import { setActiveOffer } from '../../store/actions';

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
    dispatch(setActiveOffer(offer));
  };

  return (
    <article
      onMouseEnter={isMouseEnterEvent && handleActiveOffer}
      className={`${block}__card place-card`}
    >
      {isPremium && <Mark block={Block.OfferCard}/>}
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
      <div className={classNames('place-card__info', { 'favorites__card-info': isFavoriteVariant })}>
        <div className="place-card__price-wrapper">
          <Price price={price} block={Block.OfferCard}/>
          <BookmarkButton variant={BookmarkButtonVariant.Card} isActive={isFavorite}/>
        </div>
        <Rating block={Block.OfferCard} rating={rating}/>
        <h2 className="place-card__name">
          <Link
            onClick={handleActiveOffer}
            to={generatePath(AppRoute.Offer, { id: id.toString() })}
          >{title}
          </Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUpperCase(type)}</p>
      </div>
    </article>
  );
};
export default OfferCard;
