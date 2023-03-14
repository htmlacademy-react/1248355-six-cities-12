import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus } from '../../consts/enum';
import { Offers as OffersType } from '../../types/offers';
import { Comments } from '../../types/comments';
import NearPlaces from '../../components/near-places/near-places';
import Container from '../../components/container/container';
import Property from '../../components/property/property';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OffersType;
  comments: Comments;
}

const OfferScreen = ({ authorizationStatus, offers, comments }: OfferScreenProps) => (
  <main className="page__main page__main--property">
    <Helmet>
      <title>Property</title>
    </Helmet>
    <Property authorizationStatus={authorizationStatus} offers={offers} comments={comments}/>
    <Container>
      <NearPlaces offers={offers}/>
    </Container>
  </main>
);

export default OfferScreen;
