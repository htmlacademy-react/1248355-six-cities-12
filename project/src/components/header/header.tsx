import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus, LogoVariant } from '../../consts/enum';
import cl from './header.module.css';
import classNames from 'classnames';
import React from 'react';
import { useAppSelector } from '../../hooks/store';

const Header = () => {
  const isLoading = useAppSelector((state) => state.api.isLoading);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo variant={LogoVariant.Header}/>
          </div>
          <nav className="header__nav">
            <ul
              className={classNames(
                'header__nav-list',
                { [cl.animation]: isLoading || authorizationStatus === AuthorizationStatus.Unknown })}
            >
              {
                authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <>
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href={AppRoute.Root}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">3</span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href={AppRoute.Root}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                  :
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="/">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
