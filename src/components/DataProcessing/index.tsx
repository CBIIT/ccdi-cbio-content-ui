import React from "react";
import ProcessItem from "./ProcessItem";

export const DataSharingProcess: React.FC = () => {
  const processList = [
    "Submit Non-NIH Funded Study to dbGaP",
    "Accessing Scientific Data for Re-Use"
  ];

  return (
    <section className="flex flex-col items-stretch items-center px-20 py-14 max-md:px-5 max-w-[1444px] mx-auto" >
      <h2 className="text-[rgba(0,117,106,1)] text-[32px] font-semibold leading-none ml-2.5 mb-4">
        Data Sharing Process
      </h2>
      <div className="flex items-stretch gap-[39px] text-xl text-[rgba(63,66,68,1)] font-normal underline tracking-[0.4px] leading-[60px] flex-wrap">
        {processList.map((item, index) => (
          <div key={index} className="flex-1 grow shrink-0 basis-0 w-fit max-md:max-w-full">
            <ProcessItem text={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataSharingProcess;