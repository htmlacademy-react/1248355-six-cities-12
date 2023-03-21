import Tabs from '../../components/tabs/tabs';
import { AppRoute, Block, City } from '../../consts/enum';
import Cities from '../../components/cities/cities';
import CityPlaces from '../../components/cities/city-places/city-places';
import MapContainer from '../../components/cities/map-container/map-container';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { generatePath, Navigate, useMatch, useParams } from 'react-router-dom';
import { setCity, setCityOffers, setExternalVisit } from '../../store/actions';
import { DEFAULT_CITY } from '../../consts/app';
import ErrorNavigate from '../../components/navigate/error-navigate/error-navigate';

const MainScreen = () => {
  const isRootRoute = !!useMatch(AppRoute.Root);
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city: City }>();
  const { offers, isExternalVisit } = useAppSelector((state) => state);

  if (city && !Object.keys(City).includes(city)) {
    return <ErrorNavigate/>;
  }

  //редирект с AppRoute.Root
  if (isRootRoute) {
    dispatch(setExternalVisit(false));
    dispatch(setCity(DEFAULT_CITY));
    dispatch(setCityOffers());
    return <Navigate to={generatePath(AppRoute.City, { city: DEFAULT_CITY })}/>;
  }

  //вход на страницу при вводе в адресную строку браузера или по ссылке из вне
  if (city && isExternalVisit) {
    dispatch(setExternalVisit(false));
    dispatch(setCity(city));
    dispatch(setCityOffers());
  }

  return (
    offers.length
      ? (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <Tabs/>
          <Cities>
            <CityPlaces/>
            <MapContainer>
              <Map block={Block.Cities}/>
            </MapContainer>
          </Cities>
        </main>
      )
      : <MainEmptyScreen/>
  );
};

export default MainScreen;
