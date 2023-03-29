import { AppRoute, AuthorizationStatus, Block, City } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { fetchOffers } from '../../store/middlewares/thunk/thunk-actions';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/form/sort/sort';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withNotFound from '../../hocs/with-not-found';
import CitiesList from '../../components/cities-list/cities-list';
import { getFilteredOffers } from '../../store/reducers/cities-slice/selectors';
import { getLocations } from '../../utils/transform';
import { getLoadingStatus } from '../../store/reducers/data-loading-status-slice/selectors';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';

type MainScreenProps = {
  setNotFound: (isNotFound: boolean) => void;
}

const MainScreen = ({ setNotFound }: MainScreenProps) => {
  const filteredOffers = useAppSelector(getFilteredOffers);
  const isLoading = useAppSelector(getLoadingStatus);
  const authStatus = useAppSelector(getUserStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city: City }>();

  useEffect(() => {
    if (!city) {
      navigate(generatePath(AppRoute.City, { city: City.Paris }));
      return;
    }

    if (filteredOffers.length) {
      return;
    }

    if (!Object.keys(City).includes(city)) {
      setNotFound(true);
      return;
    }

    dispatch(fetchOffers(city));
  }, [city, dispatch, navigate, filteredOffers.length, setNotFound]);

  return (
    <Spinner isActive={isLoading || authStatus === AuthorizationStatus.Unknown}>
      {filteredOffers.length
        ? (
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <Tabs/>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
                  <Sort/>
                  <CitiesList/>
                </section>
                <div className="cities__right-section">
                  <Map
                    locations={getLocations(filteredOffers)}
                    cityLocation={filteredOffers[0].city.location}
                    block={Block.Cities}
                  />
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
