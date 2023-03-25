import { AppRoute, Block, City, OfferCardVariant } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { fetchOffers } from '../../store/thunk-actions';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/form/sort/sort';
import OfferCard from '../../components/offer-card/offer-card';
import Map from '../../components/map/map';
import { changeCity, filterCityOffers, setCityOffers } from '../../store/reducers/cities/city-actions';
import { Offers } from '../../types/offers';
import { setLoading } from '../../store/reducers/api-reducer/api-actions';
import Spinner from '../../components/spinner/spinner';
import withNotFound from '../../hocs/with-not-found';

type MainScreenProps = {
  setNotFound: (isNotFound: boolean) => void;
}

const MainScreen = ({ setNotFound }: MainScreenProps) => {
  const offers = useAppSelector((state) => state.city.offers);
  const cityName = useAppSelector((state) => state.city.city?.name);
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city: City }>();

  useEffect(() => {
    (async () => {
      if (offers.length || !city) {
        return;
      }

      if (!Object.keys(City).includes(city)) {
        setNotFound(true);
        return;
      }

      dispatch(setLoading(true));

      const { payload } = await dispatch(fetchOffers());

      dispatch(setLoading(false));
      dispatch(setCityOffers(payload as Offers));
      dispatch(filterCityOffers(city));
      dispatch(changeCity());
    })();
  }, [city, dispatch, offers.length, setNotFound]);

  if (!city) {
    return <Navigate to={generatePath(AppRoute.City, { city: City.Paris })}/>;
  }

  return (
    <Spinner>
      {offers.length
        ? (
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <Tabs/>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {cityName}</b>
                  <Sort/>
                  <div className="cities__places-list tabs__content places__list">
                    {offers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        offer={offer}
                        variant={OfferCardVariant.Cities}
                      />))}
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map offers={offers} block={Block.Cities}/>
                </div>
              </div>
            </div>
          </main>
        )
        : <MainEmptyScreen/>}
    </Spinner>
  );

};

export default withNotFound(MainScreen);
