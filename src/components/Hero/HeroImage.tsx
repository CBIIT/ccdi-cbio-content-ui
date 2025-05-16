import React from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt = "Hero illustration" }) => {
  return (
    <div className="flex justify-center w-full">
      <img
        src={src}
        alt={alt}
        className="aspect-[1.28] object-contain w-[612px] max-w-full mt-8"
      />
    </div>
  );
};