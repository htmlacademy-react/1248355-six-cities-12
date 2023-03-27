import React from 'react';
import { LogoVariant } from '../../types/app';
import { AppRoute } from '../../consts/enum';
import { Link } from 'react-router-dom';

type LogoTypes = {
  variant: LogoVariant;
}

const Logo = ({ variant }: LogoTypes) => (
  <Link
    className={`${variant.block}__logo-link ${variant.block}__logo-link--active`}
    to={AppRoute.Root}
  >
    <img
      className={`${variant.block}__logo`}
      src="img/logo.svg"
      alt="6 cities logo"
      width={variant.imgSize.width}
      height={variant.imgSize.height}
    />
  </Link>
);

export default Logo;
