import React from "react";

interface ResourceCardProps {
  abbreviation: string;
  title: string;
  subtitle?: string;
  description: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  abbreviation,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="flex gap-[22px] items-start max-sm:flex-col">
      <div className="w-[133px] h-[124px] text-white text-[25px] tracking-[1px] box-border bg-[#0E9374] px-2.5 py-[35px] rounded-[20px] max-sm:w-[100px] max-sm:h-[100px] max-sm:text-xl">
        {abbreviation}
      </div>
      <div className="flex-1">
        <div className="text-[#F4F4F4] text-xl leading-5 mb-3 max-sm:text-lg">
          <span>{title}</span>
          {subtitle && (
            <span className="text-sm tracking-[0.28px]">({subtitle})</span>
          )}
        </div>
        <div className="text-[#F4F4F4] text-lg leading-[25px] max-sm:text-base max-sm:leading-[22px]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;