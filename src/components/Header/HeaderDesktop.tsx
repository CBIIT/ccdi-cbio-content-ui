'use client';

import Logo from './components/LogoDesktop';
import SearchBar from './components/SearchBarDesktop';
import NavBar from './components/NavbarDesktop';

const Header = () => {
  return (
    <div className="w-full" role="banner">
      <div className="mx-auto px-8 max-w-[1400px] flex">
        <Logo />
        <div className="flex ml-auto">
          <div className="pt-[42px] pr-8"><SearchBar /></div>
        </div>
      </div>
      <div className="navbarContainer"><NavBar /></div>
    </div>
  );
};

export default Header;
