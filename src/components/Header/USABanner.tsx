import { headerData } from '../../config/globalHeaderData';

const USABanner = () => (
  <aside className="flex-row w-full h-[46px] bg-[#F0F0F0]">
    <div className="flex items-center max-w-[1400px] h-full mx-auto pl-8 md:pl-4">
      <img className="mr-[14px]" src={headerData.usaFlagSmall.src} alt={headerData.usaFlagSmallAltText} />
      <div className="font-['Open_Sans'] font-normal text-[12px] leading-[16px] w-fit h-[16px]">
        An official website of the United States government
      </div>
    </div>
  </aside>
);

export default USABanner;
