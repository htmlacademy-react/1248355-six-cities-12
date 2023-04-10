import { AppRoute, AuthorizationStatus, Block, City } from '../../consts/enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { fetchOffers } from '../../store/middlewares/thunk/thunk-actions';
import Tabs from '../../components/tabs/tabs';
import SortForm from '../../components/forms/sort-form/sort-form';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import withErrorScreens, { WithErrorScreensHOCProps } from '../../hocs/with-error-screens';
import CitiesList from '../../components/cities-list/cities-list';
import { getFilteredOffers } from '../../store/reducers/cities-slice/selectors';
import { getLocations } from '../../utils/transform';
import { getLoadingStatus } from '../../store/reducers/data-status-slice/selectors';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';
import { Helmet } from 'react-helmet-async';

type MainScreenProps = WithErrorScreensHOCProps;

const MainScreen = ({ setErrorScreen, setNotFoundScreen }: MainScreenProps) => {
  const filteredOffers = useAppSelector(getFilteredOffers);
  const isLoading = useAppSelector(getLoadingStatus);
  const authStatus = useAppSelector(getUserStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city: City }>();
  const isFirstRender = useRef(true);

  useEffect(() => {
    (async () => {
      let isMounted = true;

      if (!isMounted || !isFirstRender.current) {
        return;
      }

      if (!city) {
        navigate(generatePath(AppRoute.City, { city: City.Paris }));
        return;
      }

      if (!Object.keys(City).includes(city)) {
        setNotFoundScreen(true);
        return;
      }

      const action = await dispatch(fetchOffers(city));
      isFirstRender.current = false;

      if (fetchOffers.rejected.match(action)) {
        setErrorScreen(true);
      }

      return () => {
        isMounted = false;
      };
    })();
  }, [city, dispatch, navigate, setNotFoundScreen, setErrorScreen]);

  return (
    <Spinner isActive={isLoading || authStatus === AuthorizationStatus.Unknown}>
      {filteredOffers.length
        ? (
          <main className="page__main page__main--index">
            <Helmet>
              <title>6 cities</title>
            </Helmet>
            <h1 className="visually-hidden">Cities</h1>
            <Tabs/>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
                  <SortForm/>
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

export default withErrorScreens(MainScreen);
