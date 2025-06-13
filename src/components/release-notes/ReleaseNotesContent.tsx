import * as React from 'react';

export const ReleaseNotesContent: React.FC = () => {
  return (
    <section className="pt-0.5 mt-1 w-full text-sm font-semibold text-neutral-800 max-md:max-w-full">
      <p className="leading-5 max-md:max-w-full">
        The 2.6.0 quarterly release (April 2025) of the CCDI Hub features a
        modified data model, new data, and new features for browsing and
        selecting cohorts. Three new data sets have been added from TARGET,
        Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1 (PHS000463), Acute
        Lymphoblastic Leukemia (ALL) Expansion Phase 2 (PHS000464), and Acute
        Myeloid Leukemia (AML) (PHS000465), and a field has been added to
        capture study status. Participants who were no longer eligible were
        removed from Molecular Characterization Initiative (PHS002790) and
        TARGET: Kidney, Wilms Tumor (WT)(PHS000471) studies. Explore Dashboard
        facet updates include a new facet for the study status property,
        propagation of facet text search to Sample Anatomic Site, and an
        increase of the participant set upload limit to allow for upload of
        5,000 Participant IDs. Numerous updates have been made to the Explore
        Dashboard Participants table, including new fields, customizable
        columns, a feature for creating cohorts, and mapping of associated
        information from the CCDI Participant Index (CPI). The Molecular
        Characterization Initiative (MCI) page has been updated with February
        2025 enrollment summaries and a new link to a COG transformation script
        in a GitHub repository. General updates include new links from the Home
        page and Resources menu, a dedicated Release Notes page, and more.
      </p>

      <p className="mt-3 max-md:max-w-full">
        Additional details are listed below:
      </p>

      <div className="mt-3 leading-5 max-md:max-w-full">
        CCDI Hub Data Updates
        <br />
        Data Model Updates
        <br />
        <ul className="list-disc list-inside">
          <li>Added more properties to Treatment node</li>
          <li>Added slim_url property for IDC imaging data</li>
          <li>Added study status</li>
          <li>Renamed &quot;COG Clinical Report&quot; to &quot;COG Clinical Data&quot;</li>
          <li>Updated synonym properties to include CPI mapping data</li>
        </ul>
        New Data Sets
        <br />
        <ul className="list-disc list-inside">
          <li>CCDI Pediatric In Vivo Testing Program - Neuroblastoma (PHS003163)</li>
          <li>TARGET: Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1 (PHS000463)</li>
          <li>TARGET: Acute Lymphoblastic Leukemia (ALL) Expansion Phase 2 (PHS000464)</li>
          <li>TARGET: Acute Myeloid Leukemia (AML) (PHS000465)</li>
        </ul>
        Updated Data Sets
        <br />
        <ul className="list-disc list-inside">
          <li>CCDI Pediatric In Vivo Testing Program - Leukemia (PHS003164)</li>
          <li>Comprehensive Genomic Sequencing of Pediatric Cancer Cases (CMRI/KUCC) (PHS002529)</li>
          <li>Enhancement of Data Sharing in Pediatric, Adolescent and Young Adult Cancers (PHS002431)</li>
          <li>Genomic Sequencing of Pediatric Rhabdomyosarcoma (PHS000720)</li>
          <li>Identification and Targeting of Treatment Resistant Progenitor Populations in T-cell Acute Lymphoblastic (PHS003432)</li>
          <li>Integrating Longitudinal Clinical, Sociodemographic and Genomic Data into the NCCR (PHS002677)</li>
          <li>Molecular Characterization across Pediatric Brain Tumors and Other Solid and Hematologic Malignancies for Research, Diagnostic, and Precision Medicine (PHS002517)</li>
          <li>Molecular Characterization Initiative (PHS002790)</li>
          <li>OncoKids - NGS Panel for Pediatric Malignancies (PHS002518)</li>
          <li>TARGET: Kidney, Clear Cell Sarcoma of the Kidney (CCSK) (PHS000466)</li>
          <li>TARGET: Kidney, Rhabdoid Tumor (RT)(PHS000470)</li>
          <li>TARGET: Neuroblastoma (NBL) (PHS000467)</li>
          <li>TARGET: Osteosarcoma (OS) (PHS000468)</li>
          <li>UCSF Database for the Advancement of JMML - Integration of Metadata with Omic Data (PHS002504)</li>
        </ul>
        Removed Data Sets
        <br />
        <ul className="list-disc list-inside">
          <li>Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers (PHS002620)</li>
          <li>Clonal evolution during metastatic spread in high-risk neuroblastoma (PHS003111)</li>
        </ul>
        CCDI Hub Site Updates
        <br />
        General Site
        <br />
        <ul className="list-disc list-inside">
          <li>Added tab under News page for release note notifications</li>
          <li>Added ecDNA resource block on Home page and menu link from Resources menu</li>
          <li>Added dedicated page to display full release notes</li>
          <li>Made persistent link to user guide from About menu</li>
          <li>Updated user guide</li>
        </ul>
        Molecular Characterization Initiative (MCI) page
        <br />
        <ul className="list-disc list-inside">
          <li>Added link to COG transformation script GitHub repository</li>
          <li>Increased text thickness to improve readability</li>
          <li>Fixed bug resulting in unintended outlines when interacting with donut chart</li>
          <li>Removed alt text unintentionally appearing in main page text under image</li>
          <li>Updated enrollment counts as of February 2025</li>
        </ul>
        CCDI Hub Explore Dashboard
        <br />
        Facet updates
        <br />
        <ul className="list-disc list-inside">
          <li>Added facet for study status</li>
          <li>Added text search option to sample anatomic site facet</li>
          <li>Increased participant set upload limit to 5,000</li>
        </ul>
        Tables
        <br />
        <ul className="list-disc list-inside">
          <li>Added cohort selector feature to Participants tab</li>
          <li>Added column to display study status</li>
          <li>Added commas to all numbers larger than 1,000 in table headers and pagination</li>
          <li>Added fields from Treatment, Treatment Response, and Survival nodes to Participants tab</li>
          <li>Added indicator, hover dialog, and popup table summary for participants with additional information mapped in the Cancer Participant Index (CPI)</li>
          <li>Changed column label &quot;Sex&quot; to &quot;Sex at Birth&quot; to match model</li>
          <li>Exposed properties under generic_file node</li>
          <li>Made visible columns customizable by checkbox selection</li>
          <li>Removed separate Diagnosis tab and moved relevant fields to Participants and Samples tabs</li>
        </ul>
        Cart
        <br />
        <ul className="list-disc list-inside">
          <li>Added commas to all numbers larger than 1,000 in table headers and pagination and in cart icon</li>
        </ul>
      </div>
    </section>
  );
};
