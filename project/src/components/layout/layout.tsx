import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { useMemo } from 'react';
import { AppRoute } from '../../consts/enum';
import { Offers } from '../../types/offers';

enum LayoutClassName {
  Main = 'page page--gray page--main',
  EmptyFavorites = 'page page--favorites-empty',
  Login = 'page page--gray page--login',
  Default = 'page'
}

type LayoutProps = {
  offers: Offers;
}

const Layout = ({ offers }: LayoutProps) => {
  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);

  const className = useMemo(() => {
    if (isFavoritesRoute) {
      return offers.length ? LayoutClassName.Default : LayoutClassName.EmptyFavorites;
    }

    if (isRootRoute) {
      return LayoutClassName.Main;
    }

    if (isLoginRoute) {
      return LayoutClassName.Login;
    }

    return LayoutClassName.Default;
  }, [isFavoritesRoute, isLoginRoute, isRootRoute, offers.length]);

  return (
    <div className={className}>
      <Header/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};

export default Layout;
