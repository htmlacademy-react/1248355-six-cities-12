import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { getFilteredOffers } from '../../store/reducers/cities-slice/selectors';

enum LayoutClassName {
  Main = 'page--gray page--main',
  EmptyFavorites = 'page--favorites-empty',
  Login = 'page--gray page--login',
  Default = 'page'
}

const Layout = () => {
  const offers = useAppSelector(getFilteredOffers);

  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);
  const isCityRoute = useMatch(AppRoute.City);

  return (
    <div
      className={classNames(
        LayoutClassName.Default,
        {
          [LayoutClassName.EmptyFavorites]: !offers.length && isFavoritesRoute,
          [LayoutClassName.Main]: isRootRoute || isCityRoute,
          [LayoutClassName.Login]: isLoginRoute
        })}
    >
      <Header isLoginRoute={!!isLoginRoute}/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};
export default Layout;
