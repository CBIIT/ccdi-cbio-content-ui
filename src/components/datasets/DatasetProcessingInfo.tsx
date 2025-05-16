import React from "react";
import { DatasetSidebar } from "./DatasetSidebar";
import { DatasetContent } from "./DatasetContent";

export const DatasetProcessingInfo: React.FC = () => {
  const datasetContent = (
    <>
      We are creating a CCDI-specific instance of cBioPortal.
      <br />
      The first production release of the CCDI cBioPortal instance
      will not include login capabilities. Eventually, we will
      require all users to login and attest to a data use agreement
      before accessing the application; this agreement will
      explicitly cover data re-identification. The login
      capabilities will be required when we begin loading
      datasets/types that include more controlled information. 
      <br />
      The first data we plan on sharing in our CCDI instance of
      cBioPortal is from the Molecular Characterization Initiative
      (MCI). We will be loading clinical characteristics and
      mutation information for the initial release. The mutation
      data is considered open access, based on the following logic: 
      <br />
      The MCI mutation data was sourced from controlled access
      "somatic" VCFs. When asked if the VCFs "could be used to
      generate somatic MAFs that are open-access and exclude
      potential germline variants", we received the following
      information from Ben Kelly, the Director of Computational
      Genomics at IGM: 
      <br />
      "I can confirm that the somatic VCFs are meant to include only
      somatic variants. The VCFs do contain a germline sample
      column, in order to provide "normal" sample depth and VAF
      information, but they are all presented as a homozygous
      reference genotype. That being said, there will be some
      somatic variant calls that have some level of alt allele
      evidence in the "normal". These are often artifacts and are
      often caught by various Filters. PASS variants rarely have any
      consequential evidence in the "normal" samples." 
    </>
  );

  return (
    <>
      <div className="bg-neutral-100 flex w-full flex-col items-center text-2xl text-[rgba(55,134,194,1)] font-medium leading-none px-6 border-[rgba(55,134,194,1)] border-b max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1380px] py-6 max-md:max-w-full">
          Dataset Processing Information
        </div>
      </div>
      <div className="flex min-h-6 w-full max-md:max-w-full" />
      <div className="flex w-full flex-col items-center px-6 max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1380px] max-md:max-w-full" space={8}>
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[22%] max-md:w-full max-md:ml-0">
              <DatasetSidebar />
            </div>
            <div className="w-[78%] ml-5 max-md:w-full max-md:ml-0">
              <DatasetContent title="Datasets" content={datasetContent} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};