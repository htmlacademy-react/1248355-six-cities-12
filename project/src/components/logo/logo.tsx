import React from 'react';
import { LogoVariant } from '../../types/app';
import { AppRoute } from '../../consts/enum';

type LogoTypes = {
  variant: LogoVariant;
}

const Logo = ({ variant }: LogoTypes) => (
  <a
    className={`${variant.block}__logo-link ${variant.block}__logo-link--active`}
    href={AppRoute.Root}
  >
    <img
      className={`${variant.block}__logo`}
      src="img/logo.svg"
      alt="6 cities logo"
      width={variant.imgSize.width}
      height={variant.imgSize.height}
    />
  </a>
);

export default Logo;
