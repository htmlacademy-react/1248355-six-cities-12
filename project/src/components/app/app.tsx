import MainScreen from '../../pages/main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';
import { Comments } from '../../types/comments';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../utils/browser-history';

type AppProps = {
  comments: Comments;
}

const App = ({ comments }: AppProps): JSX.Element => (
  <HelmetProvider>
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout/>}>
          <Route>
            <Route
              index
              element={<MainScreen/>}
            />
            <Route
              path={AppRoute.City}
              element={<MainScreen/>}
            />
            <Route
              path={AppRoute.Offer}
              element={
                <OfferScreen
                  comments={comments}
                  authorizationStatus={AuthorizationStatus.Auth}
                />
              }
            />
            <Route
              path={AppRoute.Login}
              element={<LoginScreen/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  {<FavoritesScreen/>}
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={<NotFoundScreen/>}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  </HelmetProvider>
);

export default App;
