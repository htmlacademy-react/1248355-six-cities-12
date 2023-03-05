import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet, useMatch } from 'react-router-dom';
import { useMemo } from 'react';
import { AppRoute, LayoutClassName } from '../../consts/enum';

const Layout = () => {
  const isFavoritesRoute = useMatch(AppRoute.Favorites);
  const isLoginRoute = useMatch(AppRoute.Login);
  const isRootRoute = useMatch(AppRoute.Root);
  const mockData = ['mock'];

  const className = useMemo(() => {
    if (isFavoritesRoute) {
      return mockData.length ? LayoutClassName.Default : LayoutClassName.EmptyFavorites;
    }

    if (isRootRoute) {
      return LayoutClassName.Main;
    }

    if (isLoginRoute) {
      return LayoutClassName.Login;
    }

    return LayoutClassName.Default;
  }, [isFavoritesRoute, isLoginRoute, isRootRoute, mockData.length]);

  return (
    <div className={className}>
      <Header/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};

export default Layout;
