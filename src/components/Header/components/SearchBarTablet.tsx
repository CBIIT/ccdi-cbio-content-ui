'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import searchIcon from '../../../assets/header/Search_Small_Icon.svg';

const SearchBar = () => {
  const router = useRouter();
  const [localText, setLocalText] = useState("");

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/sitesearch/${localText.trim()}`);
      setLocalText("");
    }
  };

  const handleSearch = () => {
    router.push(`/sitesearch/${localText.trim()}`);
    setLocalText("");
  };

  return (
    <div className="flex">
      <div className="ml-auto w-[303px] h-[43px] border border-[#71767A]">
        <label>
          <input
            id="header-search-bar"
            type="search"
            value={localText}
            placeholder=""
            onChange={handleTextInputChange}
            onKeyDown={handleKeyPress}
            className="relative -m-[1px] px-[7px] border-none font-['Open_Sans'] font-normal text-[1.27rem] leading-[47px] text-[#1b1b1b] w-[303px] h-[43px] bg-transparent placeholder-[#004A8B] focus:outline focus:outline-[0.25rem] focus:outline-[#2491ff]"
          />
        </label>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="h-[43px] font-[var(--font-open-sans)] font-bold text-base leading-[33px] text-center text-white bg-[#007BBD] px-[14px] py-[10px] rounded-r-[5px] hover:cursor-pointer hover:bg-[#004971]"
        onKeyDown={handleKeyPress}
        onClick={handleSearch}
      >
        <img src={searchIcon.src} alt="searchIcon" />
      </div>
    </div>
  );
};

export default SearchBar;
