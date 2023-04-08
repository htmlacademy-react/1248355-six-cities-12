import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { AppRoute, LayoutClassName } from '../../consts/enum';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { getFavorites } from '../../store/reducers/user-slice/selectors';

const Layout = () => {
  const favorites = useAppSelector(getFavorites);

  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);
  const isCityRoute = useMatch(AppRoute.City);

  return (
    <div
      data-testid='layout'
      className={classNames(
        LayoutClassName.Default,
        {
          [LayoutClassName.EmptyFavorites]: !favorites.length && isFavoritesRoute,
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
