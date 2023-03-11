import React from 'react';
import { LogoVariant } from '../../types/components';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';

type LogoTypes = {
  variant: LogoVariant;
}

const Logo = ({ variant }: LogoTypes) => (
  <NavLink
    className={({ isActive }) => isActive
      ? `${variant.block}__logo-link ${variant.block}__logo-link--active`
      : `${variant.block}__logo-link`}
    to={AppRoute.Root}
  >
    <img
      className={`${variant.block}__logo`}
      src="img/logo.svg"
      alt="6 cities logo"
      width={variant.imgSize.width}
      height={variant.imgSize.height}
    />
  </NavLink>
);

export default Logo;
