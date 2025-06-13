'use client';
import * as React from 'react';
import { DatasetCard } from './DatasetCard';

export const DataAccessCards: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-16 min-w-60 w-[960px] max-md:max-w-full">
            <div className="w-full">
              <DatasetCard
                title="Molecular Characterization Initiative"
                date="April 8, 2025"
                subtitle="Clinical Data"
              >
                The clinical data was sourced from{" "}
                <span style={{ textDecoration: "underline", color: "rgba(69,82,153,1)" }}>
                  CCDI Explore
                </span>{" "}
                (2.5.0 release). Available data was curated to align with the
                required cBioPortal data upload format. Cancer Type and Cancer
                Type (Detailed) data were provided by the Children's Oncology
                Group.
              </DatasetCard>

              <div className="mt-2.5">
                <DatasetCard
                  title="Molecular Characterization Initiative"
                  date="April 8, 2025"
                  subtitle="Mutation Data"
                >
                  The MCI mutation data was sourced from controlled access VCFs
                  from dbGaP:{" "}
                  <span style={{ textDecoration: "underline", color: "rgba(69,82,153,1)" }}>
                    dbGaP Study
                  </span>{" "}
                  (phs002790.v1.p1). These VCFs were generated from
                  CLIA-compliant enhanced paired tumor–normal exome sequencing
                  conducted by the Steve and Cindy Rasmussen Institute for
                  Genomic Medicine (IGM) at Nationwide Children's Hospital in
                  Columbus, OH. These were somatic VCFs where germline variants
                  had been filtered out.
                  <br />
                  The variants in each VCF file were ran thru the{" "}
                  <span style={{ textDecoration: "underline", color: "rgba(69,82,153,1)" }}>
                    vcf2maf
                  </span>{" "}
                  tool, which employs the following steps:
                  <ol>
                    <li>
                      The VCF file format is first converted to MAF format,
                      which calculates end position of the variant and strand
                      information as well as transforms data from columns in the
                      VCF file to match the standard{" "}
                      <span style={{ textDecoration: "underline", color: "rgba(69,82,153,1)" }}>
                        MAF format
                      </span>
                      .
                    </li>
                    <li>
                      The variants in MAF format are then annotated by{" "}
                      <span style={{ textDecoration: "underline", color: "rgba(69,82,153,1)" }}>
                        Ensembl's VEP
                      </span>{" "}
                      (Variant Effect Predictor) tool (which is wrapped in the
                      vcf2maf tool) which selects a single "effect" per variant
                      and provides variant level annotations from a variety of
                      other databases and sources such as rsID from dbSNP, amino
                      acid change, variant classification (e.g. Silent,
                      Missense, Nonsense, In Frame Insertion/Deletion etc.), and
                      others.
                    </li>
                  </ol>
                  The individual MAF files were then concatenated into a single
                  MAF for loading into cBioPortal. The concatenated MAF was then
                  filtered to retain only mutations that were marked as passing
                  all quality filters in the VCF.
                  <br />
                  <br />
                  <span style={{ fontWeight: "700" }}>Note:</span>
                  <span style={{ fontWeight: "500", fontStyle: "italic" }}>
                    {" "}
                    This data filtering approach may not match other CCDI/GDC
                    data sources.
                  </span>
                </DatasetCard>
              </div>
            </div>
            <footer className="flex gap-10 pt-3.5 pb-3 mt-2.5 w-full border-slate-300 border-t-[3px] min-h-[63px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAccessCards;
