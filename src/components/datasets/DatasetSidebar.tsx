'use client'
import React, { useState } from "react";

interface CategoryItemProps {
  name: string;
  secondaryInfo?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, secondaryInfo }) => {
  return (
    <div className="bg-[rgba(241,246,254,1)] flex w-full items-center gap-[40px_85px] overflow-hidden justify-between pl-[42px] pr-2.5 py-1 mt-1 first:mt-0 max-md:pl-5">
      <div className="text-base self-stretch my-auto">
        {name}
      </div>
      {secondaryInfo && (
        <div className="self-stretch gap-2.5 text-xs my-auto pt-1">
          {secondaryInfo}
        </div>
      )}
    </div>
  );
};

interface CategoryProps {
  title: string;
  items: CategoryItemProps[];
  isExpanded?: boolean;
}

const Category: React.FC<CategoryProps> = ({ title, items, isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <>
      <div className="border flex w-full items-center gap-2.5 text-base whitespace-nowrap leading-none px-5 py-3.5 border-[rgba(221,221,221,1)] border-solid">
        <img
          src={expanded ? "https://cdn.builder.io/api/v1/image/assets/4ccc52d59fb54340b43b3652db0442b6/d7f01d41ba46cf0eddfc5064c5fd5d71fd645c91?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/4ccc52d59fb54340b43b3652db0442b6/a16ec0d859cb0f35a90b3cde8136321da35136bf?placeholderIfAbsent=true"}
          alt={expanded ? "Collapse" : "Expand"}
          className="aspect-[1.83] object-contain w-[11px] self-stretch shrink-0 my-auto cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        />
        <div className="self-stretch my-auto">
          {title}
        </div>
      </div>
      {expanded && (
        <div className="w-full font-normal">
          {items.map((item, index) => (
            <CategoryItem key={index} name={item.name} secondaryInfo={item.secondaryInfo} />
          ))}
        </div>
      )}
    </>
  );
};

export const DatasetSidebar: React.FC = () => {
  return (
    <div className="text-[rgba(51,51,51,1)] font-medium">
      <div className="bg-[rgba(55,134,194,1)] border flex shrink-0 h-[7px] border-[rgba(221,221,221,1)] border-solid" />
      <div className="bg-neutral-100 border overflow-hidden text-[19px] whitespace-nowrap leading-none pl-5 py-[15px] border-[rgba(221,221,221,1)] border-solid">
        Datasets
      </div>
      <div className="bg-white border flex w-full flex-col overflow-hidden items-stretch justify-center border-[rgba(221,221,221,1)] border-solid">
        <Category 
          title="Category" 
          isExpanded={true}
          items={[
            { name: "Item name", secondaryInfo: "Secondary info" },
            { name: "Item name", secondaryInfo: "Secondary info" }
          ]} 
        />
        <Category 
          title="Category" 
          items={[
            { name: "Item name", secondaryInfo: "Secondary info" },
            { name: "Item name", secondaryInfo: "Secondary info" }
          ]} 
        />
      </div>
    </div>
  );
};
