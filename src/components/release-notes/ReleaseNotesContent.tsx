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
        Added more properties to Treatment node
        <br />
        Added slim_url property for IDC imaging data
        <br />
        Added study status
        <br />
        Renamed &quot;COG Clinical Report&quot; to &quot;COG Clinical
        Data&quot;
        <br />
        Updated synonym properties to include CPI mapping data
        <br />
        New Data Sets
        <br />
        CCDI Pediatric In Vivo Testing Program - Neuroblastoma (PHS003163)
        <br />
        TARGET: Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1 (PHS000463)
        <br />
        TARGET: Acute Lymphoblastic Leukemia (ALL) Expansion Phase 2
        (PHS000464)
        <br />
        TARGET: Acute Myeloid Leukemia (AML) (PHS000465)
        <br />
        Updated Data Sets
        <br />
        CCDI Pediatric In Vivo Testing Program - Leukemia (PHS003164)
        <br />
        Comprehensive Genomic Sequencing of Pediatric Cancer Cases (CMRI/KUCC)
        (PHS002529)
        <br />
        Enhancement of Data Sharing in Pediatric, Adolescent and Young Adult
        Cancers (PHS002431)
        <br />
        Genomic Sequencing of Pediatric Rhabdomyosarcoma (PHS000720)
        <br />
        Identification and Targeting of Treatment Resistant Progenitor
        Populations in T-cell Acute Lymphoblastic (PHS003432)
        <br />
        Integrating Longitudinal Clinical, Sociodemographic and Genomic Data
        into the NCCR (PHS002677)
        <br />
        Molecular Characterization across Pediatric Brain Tumors and Other
        Solid and Hematologic Malignancies for Research, Diagnostic, and
        Precision Medicine (PHS002517)
        <br />
        Molecular Characterization Initiative (PHS002790)
        <br />
        OncoKids - NGS Panel for Pediatric Malignancies (PHS002518) TARGET:
        Cancer Model Systems (MDLS): Cell Lines and Xenografts (including PPTP)
        (PHS000469)
        <br />
        TARGET: Kidney, Clear Cell Sarcoma of the Kidney (CCSK) (PHS000466)
        <br />
        TARGET: Kidney, Rhabdoid Tumor (RT)(PHS000470) TARGET: Kidney, Wilms
        Tumor (WT)(PHS000471)
        <br />
        TARGET: Neuroblastoma (NBL) (PHS000467)
        <br />
        TARGET: Osteosarcoma (OS) (PHS000468)
        <br />
        UCSF Database for the Advancement of JMML - Integration of Metadata
        with Omic Data (PHS002504)
        <br />
        Removed Data Sets
        <br />
        Feasibility and Clinical Utility of Whole Genome Profiling in
        Pediatric and Young Adult Cancers (PHS002620)
        <br />
        Clonal evolution during metastatic spread in high-risk neuroblastoma
        (PHS003111)
        <br />
        CCDI Hub Site Updates
        <br />
        General Site
        <br />
        Added tab under News page for release note notifications
        <br />
        Added ecDNA resource block on Home page and menu link from Resources
        menu
        <br />
        Added dedicated page to display full release notes
        <br />
        Made persistent link to user guide from About menu
        <br />
        Updated user guide
        <br />
        Molecular Characterization Initiative (MCI) page
        <br />
        Added link to COG transformation script GitHub repository
        <br />
        Increased text thickness to improve readability
        <br />
        Fixed bug resulting in unintended outlines when interacting with donut
        chart
        <br />
        Removed alt text unintentionally appearing in main page text under
        image
        <br />
        Updated enrollment counts as of February 2025
        <br />
        CCDI Hub Explore Dashboard
        <br />
        Facet updates
        <br />
        Added facet for study status
        <br />
        Added text search option to sample anatomic site facet
        <br />
        Increased participant set upload limit to 5,000
        <br />
        Tables
        <br />
        Added cohort selector feature to Participants tab
        <br />
        Added column to display study status
        <br />
        Added commas to all numbers larger than 1,000 in table headers and
        pagination
        <br />
        Added fields from Treatment, Treatment Response, and Survival nodes to
        Participants tab
        <br />
        Added indicator, hover dialog, and popup table summary for participants
        with additional information mapped in the Cancer Participant Index
        (CPI)
        <br />
        Changed column label &quot;Sex&quot; to &quot;Sex at Birth&quot; to
        match model
        <br />
        Exposed properties under generic_file node
        <br />
        Made visible columns customizable by checkbox selection
        <br />
        Removed separate Diagnosis tab and moved relevant fields to
        Participants and Samples tabs
        <br />
        Cart
        <br />
        Added commas to all numbers larger than 1,000 in table headers and
        pagination and in cart icon
      </div>
    </section>
  );
};
