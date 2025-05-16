'use client';
import React from 'react';
import { headerData } from '../../../config/globalHeaderData';

const Logo = () => (
  <div className="flex">
    <a id="header-logo-home-link" className="mt-[35px]" href={headerData.globalHeaderLogoLink}>
      <img className="h-[56px] w-fit" src={headerData.globalHeaderLogo.src} alt={headerData.globalHeaderLogoAltText} />
    </a>
  </div>
);

export default Logo;
