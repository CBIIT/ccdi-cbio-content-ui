import React from 'react';
import { headerData } from '../../../config/globalHeaderData';

const Logo = () => (
  <div className="flex">
    <a id="header-logo-home-link" className="mt-[32px]" href={headerData.globalHeaderLogoLink}>
      <img className="h-[50px] max-w-[350px]" src={headerData.globalHeaderLogoSmall.src} alt={headerData.globalHeaderLogoAltText} />
    </a>
  </div>
);

export default Logo;
