import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { useMemo } from 'react';
import { AppRoute } from '../../consts/enum';
import { Offers } from '../../types/offers';
import classNames from 'classnames';

enum LayoutClassName {
  Main = 'page--gray page--main',
  EmptyFavorites = 'page--favorites-empty',
  Login = 'page--gray page--login',
  Default = 'page'
}

type LayoutProps = {
  offers: Offers;
}

const Layout = ({ offers }: LayoutProps) => {
  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);
  const isCityRoute = useMatch(AppRoute.City);

  const className = useMemo(() => classNames(
    LayoutClassName.Default,
    {
      [LayoutClassName.EmptyFavorites]: !offers.length && isFavoritesRoute,
      [LayoutClassName.Main]: isRootRoute || isCityRoute,
      [LayoutClassName.Login]: isLoginRoute
    })
  , [isCityRoute, isFavoritesRoute, isLoginRoute, isRootRoute, offers.length]);

  return (
    <div className={className}>
      <Header/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};

export default Layout;
