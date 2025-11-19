import { FC } from 'react';

export const DataUsingContent: FC<{ content: string, isCitationBox?: boolean }> = ({
  content,
  isCitationBox = false
}) => {
  if (isCitationBox) {
    return (
      <div className="box-border flex gap-[10px] items-start justify-center px-4 sm:px-6 lg:px-[50px] py-0 w-full">
        <div
          className="
            font-[Inter] font-medium italic
            text-[18px] lg:text-[16px]
            leading-[24px] lg:leading-[22px]
            text-black text-left lg:text-center
            w-full max-w-full lg:max-w-[784px]
          "
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
      </div>
    );
  }
  return (
    <div className="font-[Inter] font-medium text-[18px] lg:text-[16px] leading-[24px] lg:leading-[22px] text-black w-full" dangerouslySetInnerHTML={{ __html: content }} />
  );
};
