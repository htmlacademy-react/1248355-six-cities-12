import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus, Block, BookmarkButtonVariant, OfferCardVariant } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import OfferCard from '../../components/offer-card/offer-card';
import React, { useEffect } from 'react';
import { MAX_NEAR_PLACES_COUNT, OFFER_SCREEN_IMG_COUNT } from '../../consts/app';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withErrorScreens, { WithErrorScreensHOCProps } from '../../hocs/with-error-screens';
import { useParams } from 'react-router-dom';
import { initOfferActions } from '../../store/middlewares/thunk/thunk-actions';
import { getNearOffers, getOffer } from '../../store/reducers/offer-slice/selectors';
import { getLocationsWithActiveOffer } from '../../utils/transform';
import { createRandomElementsArray, makeFirstLetterUpperCase } from '../../utils/common';
import Mark from '../../components/mark/mark';
import BookmarkButton from '../../components/button/bookmark-button/bookmark-button';
import Rating from '../../components/rating/rating';
import Price from '../../components/price/price';
import Reviews from '../../components/reviews/reviews';
import { getLoadingStatus } from '../../store/reducers/data-status-slice/selectors';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';
import ReviewForm from '../../components/form/review/review-form';
import ScrollToTop from '../../components/scroll/scrollToTop/scroll-to-top';

type OffersScreenProps = WithErrorScreensHOCProps;

const OfferScreen = ({ handleErrorScreensShow }: OffersScreenProps) => {
  const nearOffers = useAppSelector(getNearOffers).slice(0, MAX_NEAR_PLACES_COUNT);
  const isLoading = useAppSelector(getLoadingStatus);
  const authStatus = useAppSelector(getUserStatus);
  const offer = useAppSelector(getOffer);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(initOfferActions(id))
      .then((action) => {
        if (initOfferActions.rejected.match(action)) {
          handleErrorScreensShow(action.error.code);
        }
      });
  }, [dispatch, handleErrorScreensShow, id]);

  if (!offer || isLoading || authStatus === AuthorizationStatus.Unknown) {
    return <Spinner isActive/>;
  }

  return (
    <main className="page__main page__main--property">
      <ScrollToTop/>
      <Helmet>
        <title>Property</title>
      </Helmet>
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
              <BookmarkButton id={offer.id} isFavorite={offer.isFavorite} variant={BookmarkButtonVariant.Offer}/>
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
            <Reviews>
              {authStatus === AuthorizationStatus.Auth && <ReviewForm id={offer.id}/>}
            </Reviews>
          </div>
        </div>
        <Map
          locations={getLocationsWithActiveOffer(nearOffers, offer)}
          cityLocation={nearOffers[0].city.location}
          block={Block.Property}
        />
      </section>
      <div className="container">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearOffers
            .map((nearOffer) => (
              <OfferCard
                key={nearOffer.id}
                offer={nearOffer}
                variant={OfferCardVariant.Offer}
              />))}
        </div>
      </div>
    </main>
  );
};

export default withErrorScreens(OfferScreen);
