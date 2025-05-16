import React from "react";

interface ContactLinkProps {
  text: string;
  href: string;
  arrowSrc: string;
}

export const ContactLink: React.FC<ContactLinkProps> = ({ text, href, arrowSrc }) => {
  return (
    <a 
      href={href}
      className="flex items-stretch gap-[40px_60px] text-sm text-[rgba(194,255,241,1)] font-bold uppercase tracking-[0.7px] leading-[36px] w-[190px] border-[rgba(194,255,241,1)] border-b cursor-pointer"
    >
      <div>{text}</div>
      <img
        src={arrowSrc}
        alt=""
        className="aspect-[0.87] object-contain w-[7px] shrink-0 my-auto"
      />
    </a>
  );
};

export default ContactLink;