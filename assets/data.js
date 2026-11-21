/* =========================================================
   InsectOmics site content
   ---------------------------------------------------------
   This is the only file you need to edit to update the site.
   Everything below is PLACEHOLDER content: replace names,
   publications, links and text with your own.

   Themes: each research theme is tied to one nucleotide
   color (a, c, g, t). Projects and tools reference a theme
   by its id, and pick up that color automatically.
   ========================================================= */

window.SITE = {
  lab: {
    name: "InsectOmics",
    tagline: "Reading insect lives in their genomes.",
    intro: "We combine genomics, transcriptomics and microbiome science to understand how insects adapt to changing climates, new hosts and the chemicals we use against them.",
    institution: "Department of Entomology",
    email: "lucionavarro@cafedecolombia.com",
    address: ["Cenicafé - Planalto, ", "Km 4 vía Chinchiná-Manizales", "Manizales, 170001, Colombia"],
    join: "We are looking for curious students and postdocs who enjoy both the bench and the command line. Send a short note about what excites you and a CV.",
    social: [
      { label: "GitHub", url: "https://github.com/lnavarroe" },
      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Lucio-Navarro-Escalante?ev=hdr_xprf" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=UatpOngAAAAJ&hl=en" }
    ],
    facts: [
      { label: "Insect species sequenced", value: "3" },
      { label: "Lab members", value: "3" },
      { label: "Open-source tools", value: "2" },
      { label: "Field sites", value: " countries" }
    ]
  },

  themes: [
    {
      id: "adaptation", color: "a", glyph: "A",
      title: "Adaptation genomics",
      text: "How do insect populations respond to warming, drought and new environments? We use population genomics and experimental evolution to find the genetic changes behind local adaptation.",
      tags: ["Population genomics", "Selection scans", "Climate"]
    },
    {
      id: "resistance", color: "t", glyph: "T",
      title: "Insecticide resistance",
      text: "We map the detoxification genes and target-site mutations that let pests and disease vectors survive control chemicals, and build diagnostics to track them in the field.",
      tags: ["Detox enzymes", "Target-site mutations", "Surveillance"]
    },
    {
      id: "symbiosis", color: "g", glyph: "G",
      title: "Symbionts and microbiomes",
      text: "Many insects depend on microbes for nutrition and defence. We sequence these partners to learn what they contribute and how the partnership evolves.",
      tags: ["Metagenomics", "Endosymbionts", "Long reads"]
    },
    {
      id: "pollinators", color: "c", glyph: "C",
      title: "Pollinator health",
      text: "Bees and other pollinators face pathogens, pesticides and habitat loss at once. We use transcriptomics to measure how these stresses combine inside the hive.",
      tags: ["RNA-seq", "Gene expression", "Conservation"]
    }
  ],

  projects: [
    {
      title: "Thermal tolerance across a latitudinal cline",
      theme: "adaptation", status: "Active",
      text: "Whole-genome resequencing of 600 fruit flies from 12 populations to locate variants linked to heat tolerance.",
      lead: "Dr. Maya Okafor", funding: "National Science Foundation"
    },
    {
      title: "Resistance atlas for malaria mosquitoes",
      theme: "resistance", status: "Active",
      text: "Amplicon panels and field collections from five countries to map known and new resistance alleles in Anopheles.",
      lead: "Dr. Tomás Rivera", funding: "Global Health Fund"
    },
    {
      title: "Aphid endosymbiont genome reduction",
      theme: "symbiosis", status: "Active",
      text: "Complete long-read assemblies of Buchnera strains to reconstruct how symbiont genomes shrink over time.",
      lead: "Lena Fischer", funding: "University Research Grant"
    },
    {
      title: "Pesticide and virus stress in honey bees",
      theme: "pollinators", status: "Active",
      text: "Single-cell RNA-seq of bee brains exposed to sublethal pesticide doses and deformed wing virus.",
      lead: "Arjun Mehta", funding: "Pollinator Partnership"
    },
    {
      title: "Reference genomes for crop pests",
      theme: "resistance", status: "Completed",
      text: "Chromosome-level assemblies and annotations for eight lepidopteran crop pests, released openly.",
      lead: "Dr. Tomás Rivera", funding: "Agricultural Research Council"
    },
    {
      title: "Microbiomes of wild bumble bees",
      theme: "pollinators", status: "Completed",
      text: "16S and shotgun sequencing of 1,200 wild bumble bees to link gut communities with parasite load.",
      lead: "Sofia Lindqvist", funding: "Conservation Trust"
    }
  ],

  team: {
    lead: {
      name: "Prof. Jane Doe", role: "Principal Investigator",
      bio: "Jane started out collecting beetles and ended up sequencing them. Her group asks how genomes record an insect's ecological history, from the microbes it carries to the chemicals it survives. She teaches evolutionary genomics and coordinates the university sequencing core.",
      photo: "", // e.g. "assets/img/jane.jpg"
      links: [
        { label: "Email", url: "mailto:jane.doe@your-university.edu" },
        { label: "ORCID", url: "https://orcid.org/" },
        { label: "CV", url: "#" }
      ]
    },
    groups: [
      {
        title: "Postdoctoral researchers",
        members: [
          { name: "Dr. Maya Okafor", role: "Postdoc", focus: "Thermal adaptation in Drosophila", photo: "", links: [{ label: "Email", url: "mailto:" }, { label: "GitHub", url: "https://github.com/" }] },
          { name: "Dr. Tomás Rivera", role: "Postdoc", focus: "Resistance genomics in mosquitoes", photo: "", links: [{ label: "Email", url: "mailto:" }] }
        ]
      },
      {
        title: "Graduate students",
        members: [
          { name: "Lena Fischer", role: "PhD student", focus: "Symbiont genome evolution", photo: "", links: [{ label: "Email", url: "mailto:" }] },
          { name: "Arjun Mehta", role: "PhD student", focus: "Bee neurogenomics", photo: "", links: [{ label: "Email", url: "mailto:" }] },
          { name: "Sofia Lindqvist", role: "MSc student", focus: "Wild bee microbiomes", photo: "", links: [{ label: "Email", url: "mailto:" }] },
          { name: "Kenji Watanabe", role: "PhD student", focus: "Long-read assembly methods", photo: "", links: [{ label: "GitHub", url: "https://github.com/" }] }
        ]
      },
      {
        title: "Staff",
        members: [
          { name: "Grace Mwangi", role: "Lab manager", focus: "Sequencing and insect rearing", photo: "", links: [{ label: "Email", url: "mailto:" }] },
          { name: "Daniel Novak", role: "Bioinformatician", focus: "Pipelines and data management", photo: "", links: [{ label: "GitHub", url: "https://github.com/" }] }
        ]
      }
    ],
    alumni: [
      { name: "Dr. Priya Raman", now: "Assistant Professor, Another University" },
      { name: "Dr. Lucas Moreau", now: "Scientist, Biotech Company" },
      { name: "Hannah Becker", now: "PhD student, Research Institute" },
      { name: "Omar Haddad", now: "Data Scientist, Agri-tech startup" }
    ]
  },

  /* Names listed here are bolded in author lists */
  labAuthors: ["Doe J", "Okafor M", "Rivera T", "Fischer L", "Mehta A", "Lindqvist S", "Watanabe K", "Mwangi G", "Novak D", "Raman P", "Moreau L"],

  publications: [
    {
      year: 2026, type: "Article",
      title: "Parallel genomic responses to heat across a fruit fly latitudinal cline",
      authors: ["Okafor M", "Watanabe K", "Smith R", "Doe J"],
      venue: "Molecular Ecology", doi: "", pdf: "", code: "https://github.com/",
      keywords: ["adaptation", "Drosophila", "climate"]
    },
    {
      year: 2026, type: "Preprint",
      title: "Single-cell atlas of the honey bee brain under combined pesticide and viral stress",
      authors: ["Mehta A", "Novak D", "Garcia E", "Doe J"],
      venue: "bioRxiv", doi: "", pdf: "", code: "",
      keywords: ["pollinators", "single-cell", "RNA-seq"]
    },
    {
      year: 2025, type: "Article",
      title: "A field-ready amplicon panel for tracking insecticide resistance in Anopheles",
      authors: ["Rivera T", "Mwangi G", "Kone A", "Diallo B", "Doe J"],
      venue: "PLOS Neglected Tropical Diseases", doi: "", pdf: "", code: "https://github.com/",
      keywords: ["resistance", "mosquito", "diagnostics"]
    },
    {
      year: 2025, type: "Article",
      title: "Stepwise gene loss in aphid endosymbionts revealed by complete long-read genomes",
      authors: ["Fischer L", "Watanabe K", "Doe J"],
      venue: "Genome Biology and Evolution", doi: "", pdf: "", code: "",
      keywords: ["symbiosis", "Buchnera", "genome reduction"]
    },
    {
      year: 2024, type: "Article",
      title: "Chromosome-level genomes of eight lepidopteran crop pests",
      authors: ["Rivera T", "Novak D", "Moreau L", "Doe J"],
      venue: "Scientific Data", doi: "", pdf: "", code: "",
      keywords: ["resistance", "reference genome", "Lepidoptera"]
    },
    {
      year: 2024, type: "Review",
      title: "Insect omics in the age of long reads",
      authors: ["Doe J", "Raman P"],
      venue: "Annual Review of Entomology", doi: "", pdf: "", code: "",
      keywords: ["review", "methods"]
    },
    {
      year: 2023, type: "Article",
      title: "Gut microbiome composition predicts parasite load in wild bumble bees",
      authors: ["Lindqvist S", "Raman P", "Jones K", "Doe J"],
      venue: "ISME Journal", doi: "", pdf: "", code: "",
      keywords: ["pollinators", "microbiome", "parasites"]
    }
  ],

  tools: [
    {
      name: "hexscan", theme: "adaptation", lang: "Python",
      text: "Fast genome-wide selection scans for pooled and individual sequencing data.",
      install: "pip install hexscan",
      links: [{ label: "GitHub", url: "https://github.com/" }, { label: "Docs", url: "#" }]
    },
    {
      name: "ResistMap", theme: "resistance", lang: "R / Shiny",
      text: "Interactive map of resistance allele frequencies from published and new field data.",
      install: "",
      links: [{ label: "Open app", url: "#" }, { label: "GitHub", url: "https://github.com/" }]
    },
    {
      name: "symbiotrim", theme: "symbiosis", lang: "Nextflow",
      text: "Pipeline that separates host and symbiont reads and assembles symbiont genomes end to end.",
      install: "nextflow run your-org/symbiotrim",
      links: [{ label: "GitHub", url: "https://github.com/" }]
    },
    {
      name: "BeeExpress", theme: "pollinators", lang: "Web database",
      text: "Browse gene expression across honey bee tissues, castes and stress treatments.",
      install: "",
      links: [{ label: "Open database", url: "#" }]
    }
  ],

  protocols: [
    {
      title: "High-molecular-weight DNA from single insects",
      category: "Wet lab", time: "4 hours", updated: "2026-03",
      materials: ["Whole insect, flash-frozen", "Nanobind tissue kit", "Wide-bore pipette tips", "Qubit and TapeStation"],
      steps: [
        "Grind the frozen insect in liquid nitrogen with a cold pestle.",
        "Lyse in kit buffer with proteinase K at 55 °C for 1 hour.",
        "Bind DNA to the Nanobind disk and wash twice.",
        "Elute overnight at room temperature without pipetting.",
        "Check fragment length; aim for most DNA above 50 kb."
      ],
      file: "#", note: "Works for insects down to about 2 mg."
    },
    {
      title: "RNA extraction from bee brains",
      category: "Wet lab", time: "2 hours", updated: "2025-11",
      materials: ["Dissected brains in RNAlater", "TRIzol", "Direct-zol column kit", "DNase I"],
      steps: [
        "Homogenise brains in TRIzol with a bead mill.",
        "Load onto the Direct-zol column and wash.",
        "Treat on-column with DNase I for 15 minutes.",
        "Elute in 20 µL water and check RIN on the Bioanalyzer."
      ],
      file: "#", note: "Keep samples on dry ice during dissection."
    },
    {
      title: "Field collection and preservation for genomics",
      category: "Field", time: "Varies", updated: "2025-06",
      materials: ["95% ethanol or DNA/RNA Shield", "Labelled screw-cap tubes", "GPS app", "Collection log sheet"],
      steps: [
        "Record GPS, date, habitat and collector for every sample.",
        "Place specimens in preservative within 10 minutes of collection.",
        "Keep tubes cool and out of direct sun.",
        "Replace ethanol after 24 hours for larger specimens.",
        "Ship within two weeks or freeze at -20 °C."
      ],
      file: "#", note: "Download the printable log sheet with the protocol."
    },
    {
      title: "Variant calling pipeline",
      category: "Computational", time: "About 1 day per 100 genomes", updated: "2026-01",
      materials: ["Reference genome", "Paired-end reads", "Snakemake", "Access to the cluster"],
      steps: [
        "Clone the pipeline repository and edit config.yaml.",
        "Run read QC and trimming.",
        "Map reads with bwa-mem2 and mark duplicates.",
        "Call variants per sample, then joint-genotype.",
        "Apply hard filters and produce the final VCF report."
      ],
      file: "https://github.com/", note: "Full documentation is in the repository README."
    }
  ]
};
