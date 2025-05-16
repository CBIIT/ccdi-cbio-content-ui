import React from "react";

interface ProcessItemProps {
  text: string;
}

export const ProcessItem: React.FC<ProcessItemProps> = ({ text }) => {
  return (
    <div className="flex w-full items-center gap-2.5 justify-center p-2.5 max-md:max-w-full">
      <div className="self-stretch flex min-w-60 w-full items-center gap-5 flex-wrap flex-1 shrink basis-[0%] my-auto px-[30px] rounded-[30px] max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,148,133,1)] self-stretch flex w-[11px] shrink-0 h-[11px] my-auto rounded-[50%]" />
        <div className="self-stretch my-auto">{text}</div>
      </div>
    </div>
  );
};

export default ProcessItem;