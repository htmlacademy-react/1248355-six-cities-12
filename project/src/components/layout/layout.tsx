import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';
import classNames from 'classnames';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks/store';

enum LayoutClassName {
  Main = 'page--gray page--main',
  EmptyFavorites = 'page--favorites-empty',
  Login = 'page--gray page--login',
  Default = 'page'
}

const Layout = () => {
  const isLoading = useAppSelector((state) => state.api.isLoading);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);
  const offers = useAppSelector((state) => state.city.offers);

  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);
  const isCityRoute = useMatch(AppRoute.City);

  return (
    <div className={classNames(
      LayoutClassName.Default,
      {
        [LayoutClassName.EmptyFavorites]: !offers.length && isFavoritesRoute,
        [LayoutClassName.Main]: isRootRoute || isCityRoute,
        [LayoutClassName.Login]: isLoginRoute
      })}
    >
      <Header authorizationStatus={authorizationStatus} isLoading={isLoading}/>
      {isLoading || authorizationStatus === AuthorizationStatus.Unknown
        ?
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
        ><Spinner/>
        </div>
        :
        <Outlet/>}
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};
export default Layout;
