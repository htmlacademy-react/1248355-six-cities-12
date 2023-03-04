import MainScreen from '../../pages/main-screen/main-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../layout/layout';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import FavoritesEmptyScreen from '../../pages/favorites-empty-screen/favorites-empty-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../consts/enum';

type AppProps = {
  cardsCount: number;
}

//для теста
const mockData = ['asd'];

const App = ({cardsCount}: AppProps): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route index element={mockData.length ? <MainScreen cardsCount={cardsCount}/> : <MainEmptyScreen/>}/>
          <Route path={AppRoute.Property} element={<PropertyScreen authorizationStatus={AuthorizationStatus.NoAuth}/>}/>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                {mockData.length
                  ? <FavoritesScreen/>
                  : <FavoritesEmptyScreen/>}
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginScreen/>}/>
          <Route path='*' element={<NotFoundScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
