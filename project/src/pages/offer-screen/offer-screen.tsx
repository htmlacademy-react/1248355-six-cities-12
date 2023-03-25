import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus, OfferCardVariant } from '../../consts/enum';
import { Comments } from '../../types/comments';
import Container from '../../components/container/container';
import Property from '../../components/property/property';
import { useAppSelector } from '../../hooks/store';
import OfferCard from '../../components/offer-card/offer-card';
import React from 'react';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
  comments: Comments;
}

const OfferScreen = ({ authorizationStatus, comments }: OfferScreenProps) => {
  const offers = useAppSelector((state) => state.city.offers);

  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>Property</title>
      </Helmet>
      <Property authorizationStatus={authorizationStatus} comments={comments}/>
      <Container>
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers?.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              variant={OfferCardVariant.Offer}
            />))}
        </div>
      </Container>
    </main>
  );
};

export default OfferScreen;
