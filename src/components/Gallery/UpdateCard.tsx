import React from "react";

interface UpdateCardProps {
  image: string;
  title: string;
  description: string;
  readMoreColor: string;
  hasBorder?: boolean;
  className?: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  image,
  title,
  description,
  readMoreColor,
  hasBorder = false,
  className = "",
}) => {
  return (
    <div 
      className={`bg-[rgba(50,48,50,1)] pb-3.5 rounded-[0px_20px_0px_20px] ${
        hasBorder ? "shadow-[0px_0px_20px_rgba(0,0,0,0.25)] border border-[rgba(222,234,237,1)] border-solid p-2.5" : ""
      } ${className}`}
    >
      <div className="bg-[rgba(217,217,217,1)] rounded-[0px_0px_0px_20px]">
        <img
          src={image}
          alt={title}
          className="aspect-[1.18] object-contain w-full"
        />
      </div>
      <div className="flex flex-col items-stretch text-lg leading-7 mt-[11px] px-6 max-md:pl-5">
        <div
          className={title.includes("New Release") ? "text-[rgba(246,203,14,1)] font-bold leading-5" : "text-white font-bold leading-5"}
        >
          {title}
        </div>
        <div
          className="text-white font-normal mt-2"
        >
          {description}
        </div>
        <div
          className={`text-sm text-${readMoreColor} font-medium text-right uppercase underline z-10 mr-5 ${
            title.includes("New Release") ? "" : "-mt-7"
          } max-md:mr-2.5`}
        >
          Read More
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;