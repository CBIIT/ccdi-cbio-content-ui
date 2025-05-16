'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

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

const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.getAttribute("class") !== "dropdownList"
      ) {
        const toggle = document.getElementsByClassName("navText clicked");
        if (
          toggle[0] &&
          event.target.getAttribute("class") !== "navText clicked"
        ) {
          const temp: HTMLElement = toggle[0] as HTMLElement;
          temp.click();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const NavBar = () => {
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null);
  const [clickedTitle, setClickedTitle] = useState<string>("");
  const dropdownSelection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/config/navigation.json');
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        setNavigationData(content);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };

    fetchNavigationData();
  }, []);

  useOutsideAlerter(dropdownSelection);

  if (!navigationData) {
    return <div className="relative w-full bg-white shadow-md z-[1100]"><div className="mx-auto max-w-[1400px] text-left relative flex justify-between items-end">Loading...</div></div>;
  }

  const clickableObject = navigationData.navList.filter((item) => item.className === 'navMobileItem clickable');
  const clickableTitle = clickableObject.map((item) => item.name);

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.innerText === clickedTitle || !clickableTitle.includes(target.innerText)) {
      setClickedTitle("");
    } else {
      setClickedTitle(target.innerText);
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleMenuClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  function shouldBeUnderlined(item: NavItem): boolean {
    const linkName = item.name;
    const correctPath = typeof window !== 'undefined' ? window.location.pathname : '';
    if (item.className === "navMobileItem") {
      return correctPath === item.link;
    }
    if (!(linkName in (navigationData as NavigationData).navbarSublists)) {
      return false;
    }
    const linkNames = navigationData!.navbarSublists[linkName].map(e => e.link);
    return linkNames.includes(correctPath);
  }

  return (
    <div className="relative w-full bg-white shadow-md z-[1100]">
      <div className="mx-auto max-w-[1400px] text-left relative flex justify-between items-end">
        <ul className="list-none m-0 pt-[17px] pl-[11px]">
          {
            navigationData.navList.map((navMobileItem, idx) => {
              const navkey = `nav_${idx}`;
              return (
                navMobileItem.className === 'navMobileItem'
                  ? (
                    <li key={navkey} className="inline-block relative leading-[50px] tracking-[1px] text-center transition-all duration-300 ease-in-out">
                      <div className="block text-[#585C65] font-poppins text-[17px] font-bold leading-[40px] tracking-normal no-underline mx-[45px_0_0_5px] px-[15px] select-none border-t-4 border-l-4 border-r-4 border-transparent">
                        <Link href={navMobileItem.link} passHref>
                          <div
                            id={navMobileItem.id}
                            onKeyDown={onKeyPressHandler}
                            role="button"
                            tabIndex={0}
                            className={`cursor-pointer text-[#585C65] hover:text-[#3A75BD] hover:border-b-4 hover:border-b-[#3A75BD] 
                              ${shouldBeUnderlined(navMobileItem) ? "border-b-4 border-b-[#3A75BD]" : ""}`}
                            onClick={handleMenuClick}
                          >
                            {navMobileItem.name}
                          </div>
                        </Link>
                      </div>
                    </li>
                  )
                  : (
                    <li key={navkey} className="inline-block relative leading-[50px] tracking-[1px] text-center transition-all duration-300 ease-in-out">
                      <div className={clickedTitle === navMobileItem.name ? 'block text-white font-poppins text-[17px] font-bold leading-[40px] tracking-normal no-underline mx-[45px_0_0_5px] px-[15px] select-none bg-[#1F4671] border-t-4 border-l-4 border-r-4 border-[#5786FF]' : 'block text-[#585C65] font-poppins text-[17px] font-bold leading-[40px] tracking-normal no-underline mx-[45px_0_0_5px] px-[15px] select-none border-t-4 border-l-4 border-r-4 border-transparent'}>
                        <div
                          id={navMobileItem.id}
                          onKeyDown={onKeyPressHandler}
                          role="button"
                          tabIndex={0}
                          className={`cursor-pointer ${clickedTitle === navMobileItem.name ? 
                            'text-white bg-[#1F4671] border-b-4 border-b-[#1F4671] after:content-[""] after:inline-block after:w-[6px] after:h-[6px] after:border-t after:border-r after:border-white after:border-b-0 after:border-l-0 after:ml-2 after:mb-0 after:-rotate-45' : 
                            'text-[#585C65] hover:text-[#3A75BD] hover:border-b-4 hover:border-b-[#3A75BD] after:content-[""] after:inline-block after:w-[6px] after:h-[6px] after:border-b after:border-l after:border-[#585C65] after:ml-2 after:mb-1 after:-rotate-45 hover:after:border-[#298085]'
                          } ${shouldBeUnderlined(navMobileItem) ? "border-b-4 border-b-[#3A75BD]" : ""}`}
                          onClick={handleMenuClick}
                        >
                          {navMobileItem.name}
                        </div>
                      </div>
                    </li>
                  )
              );
            })
          }
        </ul>
      </div>
      <div ref={dropdownSelection} className={`absolute top-[60.5px] left-0 w-full bg-[#1F4671] z-[1100] ${clickedTitle === '' ? "invisible" : ""}`}>
        <div className="mx-auto text-left relative max-w-[1400px]">
          <div className="bg-[#1F4671] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-[32px_32px_0_32px]">
            {
              clickedTitle !== "" && navigationData.navbarSublists[clickedTitle]?.map((dropItem, idx) => {
                const dropkey = `drop_${idx}`;
                return (
                  dropItem.link && (
                    <Link
                      id={dropItem.id}
                      href={dropItem.link}
                      passHref
                      className="cursor-pointer p-[0_10px_52px_10px] text-left font-poppins font-semibold text-[20px] leading-[110%] text-white no-underline hover:underline"
                      key={dropkey}
                      onClick={() => setClickedTitle("")}
                    >
                      {dropItem.name}
                      {dropItem.text && dropItem.text.trim() !== '' && (
                        <div className="mt-[5px] font-open-sans font-normal text-[16.16px] leading-[22px]">
                          {dropItem.text}
                        </div>
                      )}
                    </Link>
                  )
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
