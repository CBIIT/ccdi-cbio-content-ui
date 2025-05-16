'use client';
import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import FooterData from '../../config/globalFooterData';

const FooterDesktop = () => {
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

  return (
    <>
      <footer className="bg-[#1B496E] border-t border-[#6C727B] bottom-0 w-full z-10 relative" role="contentinfo">
        <div className="p-8 max-w-[1400px] mx-auto flex justify-between">
          <div className="w-[66.7%] grid grid-cols-3">
            {FooterData.link_sections.map((linkItem, linkidx) => {
              const linkkey = `link_${linkidx}`;
              return (
                <div className="mb-6" key={linkkey}>
                  <div className="font-['Open_Sans'] text-white font-bold text-base leading-[22px] mb-2.5">
                    {linkItem.title}
                  </div>
                  {linkItem.items.map((item, itemidx) => {
                    const itemkey = `item_${itemidx}`;
                    return (
                      <div className="mb-2.5 max-w-[180px]" key={itemkey}>
                        {item.link.includes('http') ? (
                          <a className="font-['Open_Sans'] text-white font-normal text-base leading-[22px] no-underline hover:underline" 
                             href={item.link} 
                             target="_blank" 
                             rel="noopener noreferrer">{item.text}</a>
                        ) : (
                          <a className="font-['Open_Sans'] text-white font-normal text-base leading-[22px] no-underline hover:underline" 
                             href={item.link}>{item.text}</a>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <form 
            className="w-[33.3%]"
            onSubmit={handleSubmit} 
            ref={emailForm} 
            action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify" 
            method="post" 
            target="_blank" 
            id="signup" 
            noValidate
          >
            <input type="hidden" name="topic_id" id="topic_id" value="USNIHNCI_223" />
            <div className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-white mb-4">
              Sign up for email updates
            </div>
            <div className={errorClass !== "" ? 'relative border-l-4 border-[#e41154] pl-4 -left-5' : undefined}>
              <div className="font-['Open_Sans'] font-normal text-base leading-[22px] text-white mb-2.5">
                <label htmlFor="email">
                  Enter your email address
                  <div className={`${errorClass} ${
                    errorClass !== "" ? 'bg-[#e41154] py-2.5 px-1.5 pt-2.5' : ''
                  }`}>
                    {errorClass !== "" ? <div className="text-white">Enter a valid email address</div> : null}
                    <input 
                      id="email" 
                      type="email" 
                      name="email" 
                      className={`w-full h-[47px] text-[25px] pl-2 mt-2 bg-white focus:outline-[0.25rem] focus:outline-[#2491ff] ${
                        errorClass !== "" ? 'outline outline-[0.25rem] outline-[#2491ff] outline-offset-[5px]' : ''
                      }`}
                      value={emailContent} 
                      onChange={(e) => handleChange(e)} 
                    />
                  </div>
                </label>
              </div>
            </div>
            <button 
              type="submit" 
              className="bg-[#FACE00] rounded-lg border-0 px-4 py-2.5 font-['Open_Sans'] font-bold text-base text-[#14315C] mt-[18px] hover:cursor-pointer"
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="bg-[#14315C]">
          <div className="flex flex-wrap justify-between max-w-[1400px] mx-auto h-fit py-5 px-8">
            <div id="bottom-footer-header">
              <a className="no-underline" href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                <div className="font-['Poppins'] font-bold text-[24.96px] leading-[37px] text-white">National Cancer Institute</div>
                <div className="font-['Poppins'] font-normal text-[18.72px] text-white">at the National Institutes of Health</div>
              </a>
            </div>
            <div id="bottom-footer-contact-us" className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-right text-white order-1">
              Contact Us
              <div id="bottom-footer-contact-links" className="font-['Open_Sans'] font-normal text-base leading-[22px] text-white mt-1">
                {FooterData.contact_links.map((contactItem, contactidx) => {
                  const contactkey = `contact_${contactidx}`;
                  return (
                    contactItem.link.includes('http')
                      ? <a key={contactkey} href={contactItem.link} target="_blank" rel="noopener noreferrer">{contactItem.text}</a>
                      : <a key={contactkey} href={contactItem.link}>{contactItem.text}</a>
                  );
                })}
              </div>
            </div>
            <div className="order-2 w-full flex-basis-full h-8 m-0 border-0" />
            <div id="bottom-footer-follow-us" className="font-['Poppins'] font-bold text-[22.88px] leading-[34px] text-white order-3">
              Follow Us
              <div id="bottom-footer-follow-us-links" className="mt-4 flex">
                {FooterData.followUs_links.map((followItem, followidx) => {
                  const followkey = `follow_${followidx}`;
                  return (
                    <a key={followkey} className={followidx !== 0 ? "ml-2.5" : ""} href={followItem.link} target="_blank" rel="noopener noreferrer"><img src={followItem.img.src} alt={followItem.description} /></a>
                  );
                })}
              </div>
            </div>
            <div id="bottom-footer-gov-links" className="order-4">
              {FooterData.global_footer_links.map((linkItem, idx) => {
                const linkitemkey = `linkitem_${idx}`;
                return (
                  <a key={linkitemkey} href={linkItem.link} target="_blank" rel="noopener noreferrer" className="no-underline block font-['Open_Sans'] font-normal text-sm leading-6 text-right text-white">{linkItem.text}</a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterDesktop;
