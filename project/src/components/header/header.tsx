import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus, LogoVariant } from '../../consts/enum';
import cl from './header.module.css';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Link } from 'react-router-dom';
import { logUserOut } from '../../store/middlewares/thunk/thunk-actions';
import { getUser, getUserStatus } from '../../store/reducers/user-slice/selectors';
import FavoritesCount from '../favorites-count/favorites-count';
import { toast } from 'react-toastify';

type HeaderProps = {
  isLoginRoute: boolean;
}

const Header = ({ isLoginRoute }: HeaderProps) => {
  const authorizationStatus = useAppSelector(getUserStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const onLogoutClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    (async () => {
      evt.preventDefault();
      const action = await dispatch(logUserOut());

      if (logUserOut.rejected.match(action)) {
        toast.error(action.error.message, { toastId: action.error.code });
      }
    })();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo variant={LogoVariant.Header}/>
          </div>
          {isLoginRoute ||
            <nav className="header__nav">
              <ul
                className={classNames(
                  'header__nav-list',
                  { [cl.animation]: authorizationStatus === AuthorizationStatus.Unknown })}
              >
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ?
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__user-name user__name">{user?.email}</span>
                          <FavoritesCount/>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <a onClick={onLogoutClick} className="header__nav-link" href={AppRoute.Root}>
                          <span className="header__signout">Sign out</span>
                        </a>
                      </li>
                    </>
                    :
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                }
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
