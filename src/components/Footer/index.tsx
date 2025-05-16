'use client';
import React from 'react';
import FooterDesktop from './FooterDesktop';
import FooterTablet from './FooterTablet';
import FooterMobile from './FooterMobile';

const Footer = () => (
  <div className="lg:block lg:[&_.desktop]:block lg:[&_.tablet]:hidden lg:[&_.mobile]:hidden md:block md:[&_.desktop]:hidden md:[&_.tablet]:block md:[&_.mobile]:hidden [&_.desktop]:hidden [&_.tablet]:hidden [&_.mobile]:block">
    <div className="desktop">
      <FooterDesktop />
    </div>
    <div className="tablet">
      <FooterTablet />
    </div>
    <div className="mobile">
      <FooterMobile />
    </div>
  </div>
);

export default Footer;
