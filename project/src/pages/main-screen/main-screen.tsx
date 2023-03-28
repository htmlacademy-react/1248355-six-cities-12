import { AppRoute, Block, City } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { fetchOffers } from '../../store/thunk-actions';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/form/sort/sort';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withNotFound from '../../hocs/with-not-found';
import CitiesList from '../../components/cities-list/cities-list';

type MainScreenProps = {
  setNotFound: (isNotFound: boolean) => void;
}

const MainScreen = ({ setNotFound }: MainScreenProps) => {
  const offers = useAppSelector((state) => state.city.offers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city: City }>();

  useEffect(() => {
    if (!city) {
      navigate(generatePath(AppRoute.City, { city: City.Paris }));
      return;
    }

    if (offers.length) {
      return;
    }

    if (!Object.keys(City).includes(city)) {
      setNotFound(true);
      return;
    }

    dispatch(fetchOffers(city));
  }, [city, dispatch, navigate, offers.length, setNotFound]);

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
                  <b className="places__found">{offers.length} places to stay in {city}</b>
                  <Sort/>
                  <CitiesList/>
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
