'use client';
import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import FooterData from '../../config/globalFooterData';

const FooterMobile = () => {
  const [errorClass, setErrorClass] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const emailForm = useRef<HTMLFormElement>(null);

  function validateEmail(email: string): boolean {
    const reg = /^[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    return reg.test(email);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    if (!validateEmail(emailContent)) {
      setErrorClass("errorEmail");
      e.preventDefault();
    } else {
      setErrorClass("");
      emailForm.current?.submit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmailContent(e.target.value);
  };

  const handleDropdown = (param: string): void => {
    const dropdown = document.getElementById(`${param}Dropdown`);
    const arrow = document.getElementById(`${param}Arrow`);

    if (dropdown) {
      dropdown.classList.toggle("show");
    }

    if (arrow) {
      arrow.classList.toggle("rotate");
    }
  };

  return (
    <>
      <footer role="contentinfo" className="bg-[#1B496E] bottom-0 w-full z-10 relative">
        <div className="max-w-[1420px] mx-auto flex justify-between flex-col">
          <div className="flex flex-col">
            {FooterData.link_sections.map((linkItem, linkidx) => {
              const linkkey = `link_${linkidx}`;
              return (
                <div className="relative inline-block border-b border-black" key={linkkey}>
                  <button type="button" onClick={() => handleDropdown(linkkey)} 
                    className="flex flex-row items-center w-full bg-[#1B496E] font-['Open_Sans'] font-bold text-base text-white p-4 cursor-pointer">
                    <svg id={`${linkkey}Arrow`} className="mr-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                    {linkItem.title}
                  </button>
                  <div id={`${linkkey}Dropdown`} className="hidden z-[1]">
                    {linkItem.items.map((item, itemidx) => {
                      const itemkey = `item_${itemidx}`;
                      return (
                        <a className="text-white pb-4 pl-4 block w-fit font-['Open_Sans'] hover:underline" 
                          key={itemkey} 
                          href={item.link}
                          {...(item.link.includes('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {item.text}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} ref={emailForm} 
            action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify" 
            method="post" 
            target="_blank" 
            id="signup" 
            className="px-4 pb-8"
            noValidate>
            <input type="hidden" name="topic_id" id="topic_id" value="USNIHNCI_223" />
            <div className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-white mb-4">
              Sign up for email updates
            </div>
            <div className={errorClass !== "" ? 'border-l-4 border-[#e41154] pl-4 -left-5 relative' : undefined}>
              <div className="font-['Open_Sans'] text-base leading-[22px] text-white mb-2.5">
                <label htmlFor="email">
                  Enter your email address
                  <div className={errorClass ? "bg-[#e41154] py-2.5 px-1.5" : ""}>
                    {errorClass !== "" && <div className="text-white">Enter a valid email address</div>}
                    <input id="email" 
                      type="email" 
                      name="email" 
                      className="w-full h-[47px] text-[25px] pl-2 mt-2 bg-white focus:outline-[#2491ff] focus:outline-[0.25rem]" 
                      value={emailContent} 
                      onChange={(e) => handleChange(e)} />
                  </div>
                </label>
              </div>
            </div>
            <button type="submit" 
              className="w-full bg-[#FACE00] rounded-lg border-0 py-2.5 px-4 font-['Open_Sans'] font-bold text-base text-[#14315C] mt-[18px] hover:cursor-pointer">
              Sign up
            </button>
          </form>
        </div>

        <div className="bg-[#14315C]">
          <div className="flex flex-wrap flex-col justify-between max-w-[1420px] mx-auto h-fit py-5 pl-4">
            <div id="bottom-footer-header">
              <a className="no-underline whitespace-nowrap" href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                <div className="font-['Poppins'] font-bold text-[24.96px] leading-[37px] text-white">
                  National Cancer Institute
                </div>
                <div className="font-['Poppins'] font-normal text-[18.72px] text-white">
                  at the National Institutes of Health
                </div>
              </a>
            </div>
            <div id="bottom-footer-contact-us" className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-left text-white order-1 mt-6">
              Contact Us
              <div id="bottom-footer-contact-links" className="font-['Open_Sans'] font-normal text-base leading-[1.6] text-white mt-1">
                {FooterData.contact_links.map((contactItem, contactidx) => {
                  const contactkey = `contact_${contactidx}`;
                  return (
                    contactItem.link.includes('http')
                      ? <a key={contactkey} href={contactItem.link} target="_blank" rel="noopener noreferrer" className="no-underline text-white block ml-0 mr-2.5 break-words">{contactItem.text}</a>
                      : <a key={contactkey} href={contactItem.link} className="no-underline text-white block ml-0 mr-2.5 break-words">{contactItem.text}</a>
                  );
                })}
              </div>
            </div>
            <div className="order-2 w-full flex-basis-full h-8 m-0 border-0 hidden" />
            <div id="bottom-footer-follow-us" className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-white order-3 mt-4">
              Follow Us
              <div id="bottom-footer-follow-us-links" className="mt-3 flex">
                {FooterData.followUs_links.map((followItem, followidx) => {
                  const followkey = `follow_${followidx}`;
                  return (
                    <a key={followkey} className={followidx !== 0 ? "ml-2.5" : ""} href={followItem.link} target="_blank" rel="noopener noreferrer">
                      <img src={followItem.img.src} alt={followItem.description} />
                    </a>
                  );
                })}
              </div>
            </div>
            <div id="bottom-footer-gov-links" className="order-4 mt-3">
              {FooterData.global_footer_links.map((linkItem, idx) => {
                const linkitemkey = `linkitem_${idx}`;
                return (
                  <a key={linkitemkey} href={linkItem.link} target="_blank" rel="noopener noreferrer" className="no-underline font-['Open_Sans'] font-normal text-sm leading-[1.6] text-left text-white block">{linkItem.text}</a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterMobile;
