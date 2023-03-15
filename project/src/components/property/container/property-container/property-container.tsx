import { ReactNode } from 'react';
import Container from '../../../container/container';
import Mark from '../../../mark/mark';
import { Block, BookmarkButtonVariant } from '../../../../consts/enum';
import BookmarkButton from '../../../button/bookmark-button/bookmark-button';
import { Offer } from '../../../../types/offers';

type PropertyContainerProps = {
  children: ReactNode;
  data: Pick<Offer, 'isPremium' | 'title' | 'isFavorite'>;
}

const PropertyContainer = ({ children, data: { isPremium, title, isFavorite } }: PropertyContainerProps) => (
  <Container className="property__container">
    <div className="property__wrapper">
      {isPremium && <Mark block={Block.Property}/>}
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>
        <BookmarkButton isActive={isFavorite} variant={BookmarkButtonVariant.Offer}/>
      </div>
      {children}
    </div>
  </Container>
);

export default PropertyContainer;
