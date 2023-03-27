import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import Container from '../../components/container/container';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import OfferCard from '../../components/offer-card/offer-card';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { createRandomElementsArray, makeFirstLetterUpperCase } from '../../utils/common';
import { MAX_NEAR_PLACES_COUNT, OFFER_SCREEN_IMG_COUNT } from '../../consts/app';
import Mark from '../../components/mark/mark';
import BookmarkButton from '../../components/button/bookmark-button/bookmark-button';
import Rating from '../../components/rating/rating';
import Price from '../../components/price/price';
import ReviewsList from '../../components/reviews/reviews-list/reviews-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withNotFound from '../../hocs/with-not-found';
import { useParams } from 'react-router-dom';
import { fetchComments, fetchNearOffers, fetchOffer } from '../../store/thunk-actions';
import { setLoading } from '../../store/reducers/api-reducer/api-actions';
import { setComments } from '../../store/reducers/comments/comments-actions';
import { changeActiveOffer, setNearOffers } from '../../store/reducers/offers/offers-actions';
import { Comments } from '../../types/comments';
import { Offer, Offers } from '../../types/offers';
import ReviewForm from '../../components/form/review/review-form';

type OffersScreenProps = {
  setNotFound: Dispatch<SetStateAction<boolean>>;
}

const OfferScreen = ({ setNotFound }: OffersScreenProps) => {
  const activeOffer = useAppSelector((state) => state.city.activeOffer);
  const nearOffers = useAppSelector((state) => state.city.nearOffers);
  const comments = useAppSelector((state) => state.comments.comments);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    Promise
      .all([dispatch(fetchOffer(id)), dispatch(fetchNearOffers(id)), dispatch(fetchComments(id))])
      .then(([fetchOfferAction, fetchNearOffersAction, fetchCommentsAction]) => {
        if (!fetchOfferAction.payload) {
          setNotFound(true);
          return;
        }

        dispatch(setComments(fetchCommentsAction.payload as Comments));
        dispatch(setNearOffers(fetchNearOffersAction.payload as Offers));
        dispatch(changeActiveOffer(fetchOfferAction.payload as Offer));
        dispatch(setLoading(false));
      });
  }, [dispatch, id, setNotFound]);

  if (!activeOffer) {
    return null;
  }

  return (
    <Spinner>
      <main className="page__main page__main--property">
        <Helmet>
          <title>Property</title>
        </Helmet>
        <section className="property">
          <Container className="property__gallery-container">
            <div className="property__gallery">
              {createRandomElementsArray(activeOffer.images, OFFER_SCREEN_IMG_COUNT)
                .map(((image) => (
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
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {makeFirstLetterUpperCase(activeOffer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {activeOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {activeOffer.maxAdults} adults
                </li>
              </ul>
              <Price price={activeOffer.price} block={Block.Property}/>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {activeOffer.goods.map((good) => (
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
                      src={activeOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {activeOffer.host.name}
                  </span>
                  {activeOffer.host.isPro && <span className="property__user-status">&apos;Pro&apos;</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {activeOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;
                  <span className="reviews__amount">
                    {comments.length}
                  </span>
                </h2>
                <ReviewsList comments={comments}/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm id={activeOffer.id}/>}
              </section>
            </div>
          </Container>
          <Map offers={nearOffers} block={Block.Property}/>
        </section>
        <Container>
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers
              .slice(0, MAX_NEAR_PLACES_COUNT)
              .map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  variant={OfferCardVariant.Offer}
                />))}
          </div>
        </Container>
      </main>
    </Spinner>
  );
};

export default withNotFound(OfferScreen);
