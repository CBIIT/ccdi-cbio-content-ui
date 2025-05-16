'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const [localText, setLocalText] = useState("");

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && localText.trim()) {
      router.push(`/search?q=${encodeURIComponent(localText.trim())}`);
      setLocalText("");
    }
  };

  const handleSearch = () => {
    if (localText.trim()) {
      router.push(`/search?q=${encodeURIComponent(localText.trim())}`);
      setLocalText("");
    }
  };

  return (
    <div className="flex">
      <div className="ml-auto w-[224px] h-[32px] border border-[#71767A]">
        <label>
          <input
            id="header-search-bar"
            type="search"
            value={localText}
            onChange={handleTextInputChange}
            onKeyDown={handleKeyPress}
            className="m-[-1px_0_0_-1px] p-0 px-[7px] border-none font-['Open_Sans'] font-normal text-base leading-[42px] text-[#1b1b1b] w-[224px] h-[32px] bg-transparent focus:outline-none focus:border-[3px] focus:border-[#5786FF]"
          />
        </label>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="h-[32px] font-['Open_Sans'] font-bold text-base leading-[33px] text-white bg-[#007BBD] px-[13px] rounded-[0_5px_5px_0] hover:cursor-pointer hover:bg-[#004971]"
        onKeyDown={handleKeyPress}
        onClick={handleSearch}
      >
        Search
      </div>
    </div>
  );
};

export default SearchBar;
