import Header from '../header/header';
import Footer from '../footer/footer';
import {Outlet, useLocation, useMatch} from 'react-router-dom';
import {useMemo} from 'react';
import {AppRoute, LayoutClassName} from '../../consts/enum';

const Layout = () => {
  const isFavoritesRoute = !!useMatch(AppRoute.Favorites);
  const pathname = useLocation().pathname;
  const mockData = ['mock'];

  const className = useMemo(() => {
    switch (pathname) {
      case AppRoute.Favorites:
        return mockData.length ? LayoutClassName.Default : LayoutClassName.EmptyFavorites;
      case AppRoute.Root:
        return LayoutClassName.Main;
      case AppRoute.Login:
        return LayoutClassName.Login;
      default:
        return LayoutClassName.Default;
    }
  }, [pathname, mockData.length]);

  return (
    <div className={className}>
      <Header/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};

export default Layout;
