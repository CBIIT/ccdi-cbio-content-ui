import React from "react";
import ResourceCard from "./ResourceCard";

interface ResourceData {
  abbreviation: string;
  title: string;
  subtitle?: string;
  description: string;
}

const resourcesData: ResourceData[] = [
  {
    abbreviation: "INS",
    title: "Index of NCI Studies",
    subtitle: "INS",
    description: "A database that compiles and shares information about research outputs produced by NCI-supported programs."
  },
  {
    abbreviation: "dbGaP",
    title: "Database of Genotypes and Phenotypes",
    subtitle: "dbGaP",
    description: "A database to store and distribute data and results from studies examining the interaction of genotypes and phenotypes."
  },
  {
    abbreviation: "CCDI",
    title: "Childhood Cancer Data Initiative",
    subtitle: "CCDI",
    description: "An entry point for researchers, data scientists, and citizen scientists looking to use and connect with CCDI-supported data, tools, and applications."
  },
  {
    abbreviation: "CRDC",
    title: "Cancer Research Data Commons",
    subtitle: "CRDC",
    description: "A cloud-based data science infrastructure that facilitates data submission, sharing, aaccess, interoperability, and cost-effective analysis at scale."
  },
  {
    abbreviation: "CGC",
    title: "Seven Bridges Cancer Genomics Cloud",
    subtitle: "CGC",
    description: "A flexible cloud platform that enables analysis, storage, and computation of large cancer dataset and provides a user-friendly portal to access and analyze cancer data where it lives."
  },
  {
    abbreviation: "R4R",
    title: "Resources for Researchers",
    subtitle: "R4R",
    description: "A director of NCI-supported tools and services for cancer researchers. Most resources are free of cost and available to anyone."
  }
];

export const DataSharingResources: React.FC = () => {
  return (
    <section aria-labelledby="data-sharing-title" className="flex flex-col gap-10 bg-[#323032] px-20 py-10 max-md:p-[30px] max-sm:p-5 max-w-[1444px] mx-auto mb-[90px]" >
      <h2 
        id="data-sharing-title"
        className="text-white text-[35px] font-semibold leading-[38px] max-sm:text-[28px] max-sm:leading-8"
      >
        Data Sharing Resources
      </h2>
      <div className="grid grid-cols-[1fr_1fr] gap-[33px] max-md:grid-cols-[1fr] max-md:gap-[25px]">
        {resourcesData.map((resource, index) => (
          <ResourceCard
            key={index}
            abbreviation={resource.abbreviation}
            title={resource.title}
            subtitle={resource.subtitle}
            description={resource.description}
          />
        ))}
      </div>
    </section>
  );
};

export default DataSharingResources;