import { BookmarkVariant } from '../../../types/app';

type ButtonProps = {
  variant: BookmarkVariant;
  isActive: boolean;
}

const BookmarkButton = ({ variant, isActive }: ButtonProps) => (
  <button
    className={`${isActive ? `${variant.block}__bookmark-button--active` : ''} ${variant.block}__bookmark-button button`}
    type="button"
  >
    <svg className={`${variant.block}__bookmark-icon`} width={variant.imgSize.width} height={variant.imgSize.height}>
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

export default BookmarkButton;
