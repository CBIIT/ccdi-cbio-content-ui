'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from "./components/LogoMobile";
import menuClearIcon from '../../../assets/header/Menu_Cancel_Icon.svg';
import rightArrowIcon from '../../../assets/header/Right_Arrow.svg';
import leftArrowIcon from '../../../assets/header/Left_Arrow.svg';

interface NavItem {
  name: string;
  link: string;
  external?: boolean;
  id: string;
  className: string;
  text?: string;
}

interface NavigationData {
  navList: NavItem[];
  navbarSublists: {
    [key: string]: NavItem[];
  };
}

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 16px;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);

    .searchBarArea {
        padding: 0 16px 0 0;
        margin-left: 24px;
    }

    .headerLowerContainer {
        display: flex;
        margin: 16px 0 4px 0;
        height: 51px;
    }

    .menuButton {
        width: 89px;
        height: 45px;
        background: #1F4671;
        border-radius: 5px;
        font-family: 'Open Sans';
        font-weight: 700;
        font-size: 20px;
        line-height: 45px;
        color: #FFFFFF;
        text-align: center;
    }

    .menuButton:hover {
        cursor: pointer;
    }

`;

const NavMobileContainer = styled.div<{ $display?: string; }>`
    display: ${(props) => props.$display};
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1200;
`;

const MenuArea = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    .menuContainer {
        background: #ffffff;
        width: 300px;
        height: 100%;
        padding: 21px 16px;
    }

    .greyContainer {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
    }

    .closeIcon {
        height: 14px;
        margin-bottom: 29px;
    }

    .closeIconImg {
        float: right;
    }

    .closeIconImg:hover {
        cursor: pointer;
    }

 

    .backButton {
        font-family: Open Sans;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #007BBD;
        padding-left: 16px;
        background: url(${leftArrowIcon}) left no-repeat;
    }

    .backButton:hover {
        cursor: pointer;
    }

    // .backButton:active {
    //     outline: 0.25rem solid #2491ff;
    //     outline-offset: 0.5rem;
    // }

    .navMobileContainer {
        padding: 24px 0 0 0;

        a {
            text-decoration: none;
            color: #3D4551;
        }
    }

    .navMobileItem {
        width: 268px;
        padding: 8px 24px 8px 16px;
        font-family: Open Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        color: #3D4551;
    }

    .navMobileItem:hover {
        background-color: #f9f9f7;
    }


    .SubItem {
        padding-left: 24px;
    }

    .clickable {
        background: url(${rightArrowIcon}) 90% no-repeat;
    }

    .clickable {
        cursor: pointer;
    }
`;

const Header = () => {
  const [navMobileDisplay, setNavMobileDisplay] = useState('none');
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null);
  const [navbarMobileList, setNavbarMobileList] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/config/navigation.json');
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        setNavigationData(content);
        setNavbarMobileList(content.navList);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };

    fetchNavigationData();
  }, []);

  if (!navigationData) {
    return <HeaderBanner role="banner"><HeaderContainer>Loading...</HeaderContainer></HeaderBanner>;
  }

  const clickNavItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickTitle = (e.target as HTMLElement).innerText;
    if (clickTitle in navigationData.navbarSublists) {
      setNavbarMobileList(navigationData.navbarSublists[clickTitle]);
    }
  };

  return (
    <>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          <div className="headerLowerContainer">
            <div
              role="button"
              id="header-navbar-open-menu-button"
              tabIndex={0}
              className="menuButton"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setNavMobileDisplay('block');
                }
              }}
              onClick={() => setNavMobileDisplay('block')}
            >
              Menu
            </div>
            {/* {path !== "/sitesearch" && <div className="searchBarArea"><SearchBar /></div>} */}
          </div>
        </HeaderContainer>
      </HeaderBanner>
      <NavMobileContainer $display={navMobileDisplay}>
        <MenuArea>
          <div className="menuContainer">
            <div
              role="button"
              id="navbar-close-navbar-button"
              tabIndex={0}
              className="closeIcon"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setNavMobileDisplay('none');
                }
              }}
              onClick={() => setNavMobileDisplay('none')}
            >
              <img className="closeIconImg" src={menuClearIcon.src} alt="menuClearButton" />

            </div>
            {navbarMobileList !== navigationData.navList && (
              <div
                role="button"
                id="navbar-back-to-main-menu-button"
                tabIndex={0}
                className="backButton"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setNavbarMobileList(navigationData.navList);
                  }
                }}
                onClick={() => setNavbarMobileList(navigationData.navList)}
              >
                Main Menu
              </div>
            )}
            <div className="navMobileContainer">
              {
                navbarMobileList.map((navMobileItem, idx) => {
                  const mobilekey = `mobile_${idx}`;
                  return (
                    <React.Fragment key={mobilekey}>
                      {navMobileItem.className === 'navMobileItem' && (
                        <Link id={navMobileItem.id} href={navMobileItem.link} passHref>
                          <div className="navMobileItem" onClick={() => setNavMobileDisplay('none')}>
                            {navMobileItem.name}
                          </div>
                        </Link>
                      )}
                      {navMobileItem.className === 'navMobileItem clickable' && (
                        <div
                          id={navMobileItem.id}
                          role="button"
                          tabIndex={0}
                          className="navMobileItem clickable"
                          onKeyDown={(e) => { if (e.key === "Enter") { clickNavItem({ target: e.currentTarget } as unknown as React.MouseEvent<HTMLDivElement>); } }}
                          onClick={clickNavItem}
                        >
                          {navMobileItem.name}
                        </div>
                      )}
                      {navMobileItem.className === 'navMobileSubItem' && (
                        <Link id={navMobileItem.id} href={navMobileItem.link} passHref>
                          <div
                            role="button"
                            tabIndex={0}
                            className="navMobileItem SubItem"
                            onKeyDown={(e) => { if (e.key === "Enter") { setNavMobileDisplay('none'); } }}
                            onClick={() => setNavMobileDisplay('none')}
                          >
                            {navMobileItem.name}
                          </div>
                        </Link>
                      )}
                      {navMobileItem.className === 'navMobileSubTitle' && (
                        <div className="navMobileItem">{navMobileItem.name}</div>
                      )}
                    </React.Fragment>
                  );
                })
              }
            </div>
          </div>
          <div
            role="button"
            id="navbar-close-navbar-grey-section"
            tabIndex={0}
            className="greyContainer"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setNavMobileDisplay('none');
              }
            }}
            onClick={() => setNavMobileDisplay('none')}
            aria-label="greyContainer"
          />
          {' '}

        </MenuArea>
      </NavMobileContainer>
    </>
  );
};

export default Header;
