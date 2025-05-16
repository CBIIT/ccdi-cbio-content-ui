
import React from "react";

interface GuidanceLinkProps {
  text: string;
  href: string;
}

export const GuidanceLink: React.FC<GuidanceLinkProps> = ({ text, href }) => {
  return (
    <div className="flex items-center p-2.5">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <div className="w-[11px] h-[11px] rounded-full bg-[#009485] absolute left-0"></div>
          <a 
            href={href}
            className="text-[#3F4244] font-['Poppins'] text-[20px] tracking-[0.02em] underline pl-[61px]"
          >
            {text}
          </a>
        </div>
      </div>
    </div>
  );
};
