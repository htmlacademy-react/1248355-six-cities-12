import MainScreen from '../../pages/main-screen/main-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../layout/layout';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import {AppRoute} from '../../consts/app';
import FavoritesEmptyScreen from '../../pages/favorites-empty-screen/favorites-empty-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import PrivateRoute from '../private-route/Private-route';
import {AuthorizationStatus} from '../../consts/api';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import {HelmetProvider} from 'react-helmet-async';

type AppProps = {
  cardsCount: number;
}

//для теста
const mockData = ['test'];

const App = ({cardsCount}: AppProps): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={mockData.length ? <MainScreen cardsCount={cardsCount}/> : <MainEmptyScreen/>}/>
          <Route path={AppRoute.Property} element={<PropertyScreen authorizationStatus={AuthorizationStatus.NoAuth}/>}/>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
