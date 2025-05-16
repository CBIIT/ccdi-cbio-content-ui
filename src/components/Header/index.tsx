'use client';

import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';
import HeaderMobile from './HeaderMobile';
import USABanner from './USABanner';

const Header = () => (
  <div>
    <USABanner />
    <div className="hidden lg:block">
      <HeaderDesktop />
    </div>
    <div className="hidden md:block lg:hidden">
      <HeaderTablet />
    </div>
    <div className="block md:hidden">
      <HeaderMobile />
    </div>
  </div>
);

export default Header;
