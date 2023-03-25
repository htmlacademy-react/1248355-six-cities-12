import Tabs from '../../components/tabs/tabs';
import { AppRoute, Block, City, OfferCardVariant } from '../../consts/enum';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import React from 'react';
import Sort from '../../components/form/sort/sort';
import OfferCard from '../../components/offer-card/offer-card';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const MainScreen = () => {
  const offers = useAppSelector((state) => state.city.offers);
  const cityName = useAppSelector((state) => state.city.city?.name);
  const { city } = useParams<{ city: City }>();

  if (!city) {
    return <Navigate to={generatePath(AppRoute.City, { city: City.Paris })}/>;
  }

  if (!Object.keys(City).includes(city)) {
    return <NotFoundScreen/>;
  }

  return (
    offers.length
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
      : <MainEmptyScreen/>
  );
};

export default MainScreen;
