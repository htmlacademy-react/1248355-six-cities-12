import Header from '../header/header';
import Footer from '../footer/footer';
import {Outlet, useLocation, useMatch} from 'react-router-dom';
import {AppRoute} from '../../consts/app';
import {LayoutClassName} from '../../consts/component';

//для теста
const mockData = ['mock'];

const Layout = () => {
  const isFavoritesRoute = !!useMatch(AppRoute.Favorites);
  const pathname = useLocation().pathname;

  let className:string;

  switch (pathname){
    case AppRoute.Favorites:
      className = mockData.length ? LayoutClassName.Default : LayoutClassName.EmptyFavorites;
      break;
    case AppRoute.Root:
      className = LayoutClassName.Main;
      break;
    case AppRoute.Login:
      className = LayoutClassName.Login;
      break;
    default:
      className = LayoutClassName.Default;
  }

  return (
    <div className={className}>
      <Header/>
      <Outlet/>
      {isFavoritesRoute && <Footer/>}
    </div>
  );
};

export default Layout;
