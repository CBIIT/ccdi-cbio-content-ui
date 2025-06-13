// import React from "react";

// interface DatasetContentProps {
//   title: string;
//   content: React.ReactNode;
// }

// export const DatasetContent: React.FC<DatasetContentProps> = ({ title, content }) => {
//   return (
//     <div className="bg-white border min-h-[510px] grow overflow-hidden text-[rgba(51,51,51,1)] w-full p-2 border-[rgba(221,221,221,1)] border-solid max-md:max-w-full max-md:mt-2 max-md:px-5">
//       <h2 className="text-xl font-medium leading-none">
//         {title}
//       </h2>
//       <div className="text-base font-normal leading-6 mt-6 max-md:max-w-full">
//         {content}
//       </div>
//     </div>
//   );
// };

'use client';
import * as React from 'react';

interface DatasetContentProps {
  children: React.ReactNode;
}

export const DatasetContent: React.FC<DatasetContentProps> = ({
  children,
}) => {
  return (
    <section className="pt-0.5 mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full">
      {children}
    </section>
  );
};
