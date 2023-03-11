import React from 'react';
import Logo from '../logo/logo';
import { LogoVariant } from '../../consts/enum';

const Footer = () => (
  <footer className="footer container">
    <Logo variant={LogoVariant.Footer}/>
  </footer>
);

export default Footer;
