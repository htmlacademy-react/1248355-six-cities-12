import { PlaceCardVariant } from '../../consts/enum';

type PlaceCardProps = {
  variant: typeof PlaceCardVariant[keyof typeof PlaceCardVariant];
}

const PlaceCard = ({ variant }: PlaceCardProps) => {
  const { className, imgSize } = variant;
  const isFavorite = PlaceCardVariant.Favorites === variant;

  return (
    <article className={`${className}__card place-card`}>
      {!isFavorite &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a href="/">
          <img
            className="place-card__image"
            src="img/room.jpg"
            width={imgSize.width}
            height={imgSize.height}
            alt="Place"
          />
        </a>
      </div>
      <div className={`${isFavorite ? `${className}__card-info` : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;80</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">Wood and stone place</a>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
};

export default PlaceCard;
