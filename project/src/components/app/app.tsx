import MainScreen from '../../pages/main-screen/main-screen';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from '../layout/layout';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import FavoritesEmptyScreen from '../../pages/favorites-empty-screen/favorites-empty-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';

type AppProps = {
  cardsCount: number;
}

//для теста
const mockData = ['asd'];

const App = ({ cardsCount }: AppProps): JSX.Element => (
  <HelmetProvider>
    <RouterProvider router={createBrowserRouter((createRoutesFromElements(
      <Route path={AppRoute.Root} element={<Layout/>} errorElement={<NotFoundScreen/>}>
        <Route errorElement={<NotFoundScreen/>}>
          <Route index element={mockData.length ? <MainScreen cardsCount={cardsCount}/> : <MainEmptyScreen/>}/>
          <Route path={AppRoute.Offer} element={<OfferScreen authorizationStatus={AuthorizationStatus.NoAuth}/>}/>
          <Route path={AppRoute.Login} element={<LoginScreen/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              {mockData.length
                ? <FavoritesScreen/>
                : <FavoritesEmptyScreen/>}
            </PrivateRoute>
          }
          />
        </Route>
      </Route>)))}
    />
  </HelmetProvider>
);

export default App;
