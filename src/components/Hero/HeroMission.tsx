import React from 'react';

interface HeroMissionProps {
  title: string;
  description: React.ReactNode;
}

export const HeroMission: React.FC<HeroMissionProps> = ({ title, description }) => {
  return (
    <section className="z-10 mt-[-7px] font-normal max-md:max-w-full">
      <h2 className="text-[rgba(105,105,105,1)] text-xl leading-none max-md:max-w-full">
        {title}
      </h2>
      <p className="text-black text-lg leading-7 mt-2.5 max-md:max-w-full">
        {description}
      </p>
    </section>
  );
};