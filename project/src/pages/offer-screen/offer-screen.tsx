import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus } from '../../consts/enum';
import { Comments } from '../../types/comments';
import NearPlaces from '../../components/near-places/near-places';
import Container from '../../components/container/container';
import Property from '../../components/property/property';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useParams } from 'react-router-dom';
import ErrorNavigate from '../../components/navigate/error-navigate/error-navigate';
import { setActiveOffer, setCityOffers, setExternalVisit } from '../../store/actions';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
  comments: Comments;
}

const OfferScreen = ({ authorizationStatus, comments }: OfferScreenProps) => {
  const dispatch = useAppDispatch();
  const { isExternalVisit, activeOffer, nearOffers } = useAppSelector((state) => state);
  const { id } = useParams();

  if (!activeOffer || isExternalVisit) {
    const offer = id && nearOffers?.find((it) => it.id === +id);

    if (!offer) {
      return <ErrorNavigate/>;
    }

    dispatch(setExternalVisit(false));
    dispatch(setActiveOffer(offer));
    dispatch(setCityOffers());
  }

  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>Property</title>
      </Helmet>
      <Property authorizationStatus={authorizationStatus} comments={comments}/>
      <Container>
        <NearPlaces/>
      </Container>
    </main>
  );
};

export default OfferScreen;
