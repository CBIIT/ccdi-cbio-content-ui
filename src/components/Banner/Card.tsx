import React from "react";

interface CardProps {
  imageSrc: string;
  description: string;
  imageWidth?: string;
  imageAspect?: string;
}

export const Card: React.FC<CardProps> = ({
  imageSrc,
  description,
  imageWidth = "w-24",
  imageAspect = "aspect-[1]",
}) => {
  return (
    <div className="bg-[rgba(0,148,133,1)] self-stretch flex min-w-60 items-center text-lg text-white font-normal text-center leading-6 my-auto p-2.5 rounded-[20px] ">
      <div className="self-stretch flex items-center gap-2.5 overflow-hidden my-auto px-2.5">
        <img
          src={imageSrc}
          alt=""
          className={`${imageAspect} object-contain ${imageWidth} self-stretch shrink-0 my-auto`}
        />
      </div>
      <div className="self-stretch min-w-60 w-[285px] my-auto px-[7px] py-2">
        {description}
      </div>
    </div>
  );
};

export default Card;