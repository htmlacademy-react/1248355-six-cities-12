import { Helmet } from 'react-helmet-async';
import { Block, OfferCardVariant } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import OfferCard from '../../components/offer-card/offer-card';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ERROR, MAX_NEAR_PLACES_COUNT } from '../../consts/app';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withNotFound from '../../hocs/with-not-found';
import { useParams } from 'react-router-dom';
import { initOfferActions } from '../../store/thunk-actions';
import Offer from '../../components/offer/offer';

type OffersScreenProps = {
  setNotFound: Dispatch<SetStateAction<boolean>>;
}

const OfferScreen = ({ setNotFound }: OffersScreenProps) => {
  const nearOffers = useAppSelector((state) => state.city.nearOffers);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(initOfferActions(id))
      .then((response) => {
        if (Object.hasOwn(response, ERROR)) {
          setNotFound(true);
        }
      });
  }, [dispatch, id, setNotFound]);

  return (
    <Spinner>
      <main className="page__main page__main--property">
        <Helmet>
          <title>Property</title>
        </Helmet>
        <Offer>
          <Map offers={nearOffers} block={Block.Property}/>
        </Offer>
        <div className="container">
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
        </div>
      </main>
    </Spinner>
  );
};

export default withNotFound(OfferScreen);
