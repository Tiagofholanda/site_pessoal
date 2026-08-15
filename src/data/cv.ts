export type Locale = "pt" | "en";

export const cvLinks = {
  lattes: "http://lattes.cnpq.br/4969639760120080",
  orcid: "https://orcid.org/0000-0001-6898-5027",
  scholar: "https://scholar.google.com.br/citations?user=XLu_qAIAAAAJ&hl=pt-BR",
  researchgate: "https://www.researchgate.net/profile/Tiago_Holanda",
  linkedin: "https://www.linkedin.com/in/tiago-holanda-082928141/",
  github: "https://github.com/Tiagofholanda",
  email: "tfholanda@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/111590174?v=4",
};

export const cvCopy = {
  pt: {
    nav: "Currículo",
    title: "Currículo e trajetória",
    subtitle:
      "Histórico profissional e acadêmico de Tiago Fernando de Holanda — GIS, WebGIS, cadastro territorial, geomorfologia costeira e aerofotogrametria.",
    summaryTitle: "Resumo",
    summary:
      "Doutorando em Geografia pela UFF (LAGEF / H2O / LACCOST). Mestre em Ciências Geodésicas e Tecnologias da Geoinformação (UFPE) e geógrafo (UFPE). Desenvolvedor de GIS II e professor da especialização em Geoprocessamento na UFABC. Atua em WebGIS (React, Mapbox, GeoServer, GeoNode), bancos PostGIS, automação com Python e R, dashboards e aerofotogrametria com drone e GNSS. Experiência em cadastro, PAEBM, reassentamento (Fundação Renova), vigilância territorial e pesquisa costeira. Revisor e membro de corpo editorial de periódicos de meio ambiente, sensoriamento remoto e geomorfologia.",
    educationTitle: "Formação acadêmica e técnica",
    experienceTitle: "Experiência profissional",
    researchTitle: "Pesquisa, laboratórios e projetos",
    publicationsTitle: "Publicações selecionadas",
    teachingTitle: "Docência e cursos ministrados",
    editorialTitle: "Atuação científica",
    editorialBoardTitle: "Membro de corpo editorial",
    reviewerTitle: "Revisor de periódico",
    skillsTitle: "Competências técnicas",
    linksTitle: "Perfis acadêmicos",
    present: "atual",
  },
  en: {
    nav: "CV",
    title: "Curriculum and trajectory",
    subtitle:
      "Professional and academic record of Tiago Fernando de Holanda — GIS, WebGIS, land cadastre, coastal geomorphology and photogrammetry.",
    summaryTitle: "Summary",
    summary:
      "PhD candidate in Geography at UFF (LAGEF / H2O / LACCOST). MSc in Geodetic Sciences and Geoinformation Technologies (UFPE) and geographer (UFPE). GIS Developer II and professor in the Geoprocessing specialization at UFABC. Works with WebGIS (React, Mapbox, GeoServer, GeoNode), PostGIS, Python/R automation, dashboards, and drone/GNSS photogrammetry. Experience in cadastre, dam emergency plans, resettlement (Fundação Renova), territorial surveillance and coastal research. Reviewer and editorial-board member of journals in environment, remote sensing and geomorphology.",
    educationTitle: "Academic and technical education",
    experienceTitle: "Professional experience",
    researchTitle: "Research, labs and projects",
    publicationsTitle: "Selected publications",
    teachingTitle: "Teaching and courses delivered",
    editorialTitle: "Scientific service",
    editorialBoardTitle: "Editorial board member",
    reviewerTitle: "Journal reviewer",
    skillsTitle: "Technical skills",
    linksTitle: "Academic profiles",
    present: "present",
  },
} as const;

export const education = [
  {
    period: "2021 —",
    pt: {
      title: "Doutorado em andamento em Geografia",
      place: "Universidade Federal Fluminense (UFF)",
      detail:
        "Tese: Morfologia de praia e dunas frontais expostas a ventos bidirecionais e tempestades. Orientador: Guilherme Borges Fernandez. Laboratórios LAGEF, H2O e LACCOST.",
    },
    en: {
      title: "PhD in Geography (in progress)",
      place: "Fluminense Federal University (UFF)",
      detail:
        "Thesis: Beach and foredune morphology under bidirectional winds and storms. Advisor: Guilherme Borges Fernandez. Labs: LAGEF, H2O and LACCOST.",
    },
  },
  {
    period: "2018 — 2020",
    pt: {
      title: "Mestrado em Ciências Geodésicas e Tecnologias da Geoinformação",
      place: "Universidade Federal de Pernambuco (UFPE)",
      detail:
        "Dissertação: Mapeamento morfodinâmico da Praia do Paiva–PE. Orientador: Rodrigo Mikosz Gonçalves. Bolsista CAPES.",
    },
    en: {
      title: "MSc in Geodetic Sciences and Geoinformation Technologies",
      place: "Federal University of Pernambuco (UFPE)",
      detail:
        "Thesis: Morphodynamic mapping of Paiva Beach, PE. Advisor: Rodrigo Mikosz Gonçalves. CAPES scholarship.",
    },
  },
  {
    period: "2014 — 2018",
    pt: {
      title: "Graduação em Geografia",
      place: "Universidade Federal de Pernambuco (UFPE)",
      detail:
        "TCC: Morfodinâmica da Praia do Paiva–PE. Orientadores: Osvaldo Girão e Pedro de Souza Pereira. Bolsista PET Geografia (FNDE/MEC).",
    },
    en: {
      title: "BSc in Geography",
      place: "Federal University of Pernambuco (UFPE)",
      detail:
        "Undergraduate thesis: Morphodynamics of Paiva Beach, PE. Advisors: Osvaldo Girão and Pedro de Souza Pereira. PET Geography fellow.",
    },
  },
  {
    period: "2021 — 2022",
    pt: {
      title: "Técnico em Geoprocessamento",
      place: "IFSULDEMINAS",
      detail: "Formação técnica em geoprocessamento, geologia e geociências.",
    },
    en: {
      title: "Technical degree in Geoprocessing",
      place: "IFSULDEMINAS",
      detail: "Technical training in geoprocessing, geology and geosciences.",
    },
  },
  {
    period: "2021 — 2022",
    pt: {
      title: "Técnico em Agrimensura e especialista em georreferenciamento",
      place: "ETEC / formação complementar",
      detail: "Agrimensura e georreferenciamento de imóveis.",
    },
    en: {
      title: "Surveying technician and land-referencing specialist",
      place: "ETEC / complementary training",
      detail: "Surveying and legal land georeferencing.",
    },
  },
  {
    period: "em curso",
    pt: {
      title: "Análise e Desenvolvimento de Sistemas",
      place: "Estácio",
      detail: "Graduação em andamento, com foco em software e sistemas.",
    },
    en: {
      title: "Systems Analysis and Development",
      place: "Estácio",
      detail: "Undergraduate degree in progress, focused on software and systems.",
    },
  },
];

export const experience = [
  {
    period: "02/2024 —",
    pt: {
      role: "Desenvolvedor de GIS II",
      org: "ATOS",
      detail:
        "Desenvolvimento de aplicações WebGIS e sistemas, customização e geração de bancos de dados, regras de negócio espaciais e interfaces de análise com equipes de UX/UI.",
    },
    en: {
      role: "GIS Developer II",
      org: "ATOS",
      detail:
        "WebGIS and systems development, spatial database design, business rules and analysis interfaces with UX/UI teams.",
    },
  },
  {
    period: "02/2024 — 10/2025",
    pt: {
      role: "Desenvolvedor WebGIS / Especialista de Geoprocessamento",
      org: "DEVGIS",
      detail:
        "React + Mapbox GL JS, mapas em tempo real, APIs REST, performance com grandes volumes vetoriais e raster, PostGIS e biblioteca interna de mapeamento.",
    },
    en: {
      role: "WebGIS Developer / Geoprocessing Specialist",
      org: "DEVGIS",
      detail:
        "React + Mapbox GL JS, real-time maps, REST APIs, performance on large vector/raster volumes, PostGIS and an internal mapping library.",
    },
  },
  {
    period: "02/2025 — 07/2026",
    pt: {
      role: "Especialista de Geoprocessamento",
      org: "AERO Engenharia",
      detail:
        "Atuação como especialista GIS: geração de layouts e produtos cartográficos em ArcGIS e QGIS, estruturação e interlocução de processos com Python, modelagem e gestão de bancos de dados espaciais e implantação de WebGIS. No eixo de saúde, desenvolvimento de IA para identificação de possíveis focos de dengue a partir de imagens de drone, dashboards e WebGIS (GeoServer/GeoNode) para monitoramento de animais e apoio à vigilância territorial.",
    },
    en: {
      role: "Geoprocessing Specialist",
      org: "AERO Engenharia",
      detail:
        "GIS specialist work: map layout and cartographic products in ArcGIS and QGIS, process automation and integration with Python, spatial database modeling and management, and WebGIS deployment. In the health track, AI to identify possible dengue breeding sites from drone imagery, dashboards and WebGIS (GeoServer/GeoNode) for animal monitoring and territorial surveillance support.",
    },
  },
  {
    period: "07/2023 —",
    pt: {
      role: "Professor da especialização em Geoprocessamento",
      org: "Universidade Federal do ABC (UFABC)",
      detail:
        "Docência na especialização em Geoprocessamento, disciplinas da pós-graduação, orientação de TCC e acompanhamento pedagógico.",
    },
    en: {
      role: "Professor, Geoprocessing specialization",
      org: "Federal University of ABC (UFABC)",
      detail:
        "Teaching in the Geoprocessing specialization, postgraduate courses, thesis advising and pedagogical support.",
    },
  },
  {
    period: "06/2024 — 12/2024",
    pt: {
      role: "Especialista de Geoprocessamento",
      org: "NMC Integrativa",
      detail:
        "Estruturação de dados GIS, automação com Python e R voltada a cadastro e PAEBM, produção cartográfica, dashboards e planejamento de tarefas internas.",
    },
    en: {
      role: "Geoprocessing Specialist",
      org: "NMC Integrativa",
      detail:
        "GIS data structuring, Python/R automation for cadastre and dam emergency plans, cartographic production, dashboards and internal task planning.",
    },
  },
  {
    period: "03/2023 — 05/2024",
    pt: {
      role: "Analista de Planejamento / Geoprocessamento",
      org: "RAC Soluções Ambientais (Fundação Renova — programas 07 e 08)",
      detail:
        "Operação GIS no ecossistema ESRI (ArcGIS Desktop, ArcGIS Pro, ArcGIS Online e Apps): estruturação de dados, mapas temáticos, dashboards, conversão e integração de dados (CAD, KMZ, GPX, XLS), aerofotogrametria com drone, sensoriamento remoto, fiscalização de medição em campo e supervisão de contratos no reassentamento familiar.",
    },
    en: {
      role: "Planning / Geoprocessing Analyst",
      org: "RAC Soluções Ambientais (Fundação Renova — programs 07 and 08)",
      detail:
        "GIS operations in the ESRI stack (ArcGIS Desktop, ArcGIS Pro, ArcGIS Online and Apps): data structuring, thematic maps, dashboards, data conversion and integration (CAD, KMZ, GPX, XLS), drone photogrammetry, remote sensing, field measurement control and contract supervision in family resettlement.",
    },
  },
  {
    period: "06/2021 — 03/2023",
    pt: {
      role: "Prestador de serviço técnico-científico",
      org: "Caroá Topografia e Agrimensura",
      detail: "Estruturação do mapeamento aerofotogramétrico com drone e do GIS da operação.",
    },
    en: {
      role: "Technical-scientific contractor",
      org: "Caroá Topografia e Agrimensura",
      detail: "Set up drone photogrammetric mapping and the operation GIS.",
    },
  },
  {
    period: "03/2021 — 04/2021",
    pt: {
      role: "Consultor técnico",
      org: "Corpo técnico de perícia ambiental — Ipojuca/PE",
      detail: "Mapeamento aerofotogramétrico com drone e GIS para perícia ambiental.",
    },
    en: {
      role: "Technical consultant",
      org: "Environmental forensics team — Ipojuca, PE",
      detail: "Drone photogrammetry and GIS for environmental expert reports.",
    },
  },
  {
    period: "01/2020 — 07/2021",
    pt: {
      role: "Professor do Departamento de Geografia",
      org: "Universidade de Pernambuco (UPE)",
      detail:
        "Cartografia Básica, Cartografia Temática, Estatística aplicada a dados geográficos, Climatologia, Biogeografia e geotecnologias.",
    },
    en: {
      role: "Lecturer, Department of Geography",
      org: "University of Pernambuco (UPE)",
      detail:
        "Basic and thematic cartography, statistics for geographic data, climatology, biogeography and geotechnologies.",
    },
  },
  {
    period: "2019 — 2022",
    pt: {
      role: "Professor de Geografia",
      org: "Secretaria de Educação de Pernambuco e Prefeitura do Cabo de Santo Agostinho",
      detail: "Docência em Geografia no ensino fundamental e médio.",
    },
    en: {
      role: "Geography teacher",
      org: "Pernambuco Education Secretariat and Cabo de Santo Agostinho municipality",
      detail: "Geography teaching in primary and secondary education.",
    },
  },
];

export const research = [
  {
    period: "2018 —",
    pt: {
      title: "Laboratório de Cartografia Costeira (LACCOST / UFPE)",
      detail: "Colaborador. Cartografia costeira, linha de costa e monitoramento com drone e GNSS.",
    },
    en: {
      title: "Coastal Cartography Lab (LACCOST / UFPE)",
      detail: "Collaborator. Coastal cartography, shoreline and drone/GNSS monitoring.",
    },
  },
  {
    period: "2017 —",
    pt: {
      title: "Laboratório de Oceanografia Geológica (LABOGEO / UFPE)",
      detail: "Integrante do grupo de pesquisa em oceanografia geológica e evolução da margem continental.",
    },
    en: {
      title: "Geological Oceanography Lab (LABOGEO / UFPE)",
      detail: "Research group member in geological oceanography and continental-margin evolution.",
    },
  },
  {
    period: "2022 —",
    pt: {
      title: "Projeto MADEPD (coordenador)",
      detail:
        "Morfodinâmica e arquitetura deposicional entre praias e dunas frontais no litoral do Rio de Janeiro — ventos bidirecionais, tempestades, RPAS e GPR.",
    },
    en: {
      title: "MADEPD project (coordinator)",
      detail:
        "Morphodynamics and depositional architecture of beaches and foredunes on the Rio de Janeiro coast — bidirectional winds, storms, RPAS and GPR.",
    },
  },
  {
    period: "2017 —",
    pt: {
      title: "PELD Tamandaré (PELDTAMS)",
      detail:
        "Monitoramento de praia com drone e GNSS; dinâmica espacial e temporal de ecossistemas marinhos no sul de Pernambuco.",
    },
    en: {
      title: "PELD Tamandaré (PELDTAMS)",
      detail:
        "Beach monitoring with drone and GNSS; spatial and temporal dynamics of marine ecosystems in southern Pernambuco.",
    },
  },
  {
    period: "2019 —",
    pt: {
      title: "Reserva Biológica do Atol das Rocas",
      detail: "Monitoramento, fiscalização e conservação marinha com VANTs. Coordenação: Mirella Costa.",
    },
    en: {
      title: "Atol das Rocas Biological Reserve",
      detail: "Marine monitoring, inspection and conservation using UAVs. Coordinator: Mirella Costa.",
    },
  },
  {
    period: "2014 — 2018",
    pt: {
      title: "PET Geografia (UFPE) e grupo ANTROPOGEO",
      detail: "Bolsista PET (ensino, pesquisa e extensão) e integrante do grupo de pesquisa ANTROPOGEO.",
    },
    en: {
      title: "PET Geography (UFPE) and ANTROPOGEO group",
      detail: "PET fellow (teaching, research and outreach) and ANTROPOGEO research-group member.",
    },
  },
];

export const publications = [
  {
    year: "2022",
    ref: "GONÇALVES, R. M.; HOLANDA, T. F.; QUEIROZ, H. A. A.; SOUSA, P. H. G. O.; PEREIRA, P. S. Exploring RPAS potentiality using a RGB camera to understand short term variation on sandy beaches. CATENA, v. 210, 105949.",
  },
  {
    year: "2020",
    ref: "HOLANDA, T. F.; GONÇALVES, R. M.; LINO, A. P.; SOUZA, P. P.; SOUSA, P. H. G. O. Classificação das variações morfodinâmicas e processos costeiros, Praia do Paiva, PE, Brasil. Revista Brasileira de Geomorfologia, v. 21, p. 235–251.",
  },
  {
    year: "2023",
    ref: "CÂMARA, I. F.; HOLANDA, T. F.; COSTA, M. B. Erosão e gestão costeira em praias protegidas por recifes no litoral sul de Pernambuco. Revista Brasileira de Geomorfologia, v. 24.",
  },
  {
    year: "2023",
    ref: "JESUS, L. V.; SOUZA, P. P.; ANDRADE, A. C. S.; NASCIMENTO, E. A. N.; HOLANDA, T. F. Influência das barras transversais na variação da linha de costa em praia tropical de baixa energia. Revista Brasileira de Geomorfologia, v. 24.",
  },
  {
    year: "2023",
    ref: "MELO, M. F. O.; HOLANDA, T. F. Automação de downloads diários das observações GNSS das estações da RBMC e das efemérides precisas do IGS. Revista Brasileira de Sensoriamento Remoto, v. 4.",
  },
  {
    year: "2020",
    ref: "BRAGA, S. E.; WANDERLEY, R. A.; HOLANDA, T. F.; CALDAS, A. M. Aplicação da Análise Hierárquica para mapeamento de risco de inundação: Limoeiro (PE). Meio Ambiente (Brasil), v. 2, p. 57–66.",
  },
];

export const teaching = [
  {
    pt: "Professor na UPE: Cartografia Básica e Temática, Estatística aplicada, Climatologia, Biogeografia e geotecnologias (2020–2021).",
    en: "Lecturer at UPE: basic and thematic cartography, applied statistics, climatology, biogeography and geotechnologies (2020–2021).",
  },
  {
    pt: "Professor da especialização em Geoprocessamento na UFABC (disciplinas, orientação de TCC e acompanhamento pedagógico).",
    en: "Professor in the Geoprocessing specialization at UFABC (courses, thesis advising and pedagogical support).",
  },
  {
    pt: "Cursos e palestras na UFPE: drone aplicado à climatologia; EPG/PET Geografia (2019); LACCOST, AMPLAGEO e LABOGEO (2020); aerofotogrametria com VANT (coordenador, 2017).",
    en: "Courses and talks at UFPE: drones in climatology; EPG/PET Geography (2019); LACCOST, AMPLAGEO and LABOGEO (2020); UAV photogrammetry (coordinator, 2017).",
  },
];

export const editorialBoard = [
  {
    period: "2020 —",
    journal: "Meio Ambiente (Brasil)",
  },
  {
    period: "2020 —",
    journal: "Educação Ambiental (Brasil)",
  },
  {
    period: "2020 —",
    journal: "Revista Brasileira de Sensoriamento Remoto",
  },
  {
    period: "2018 —",
    journal: "Revista Brasileira de Meio Ambiente",
  },
  {
    period: "",
    journal: "Remote Sensing Applications: Society and Environment",
  },
];

export const journalReviewer = [
  {
    period: "2023 —",
    journal: "Revista Brasileira de Geomorfologia",
  },
  {
    period: "2023 —",
    journal: "Journal of Integrated Coastal Zone Management",
  },
  {
    period: "2022 —",
    journal: "Ocean & Coastal Management",
  },
  {
    period: "2021 —",
    journal: "Journal of Coastal Research",
  },
  {
    period: "2020 —",
    journal: "Revista Brasileira de Sensoriamento Remoto",
  },
  {
    period: "2020 —",
    journal: "Educação Ambiental (Brasil)",
  },
  {
    period: "2020 —",
    journal: "Meio Ambiente (Brasil)",
  },
  {
    period: "2018 —",
    journal: "Revista Brasileira de Meio Ambiente",
  },
];

export const skills = [
  {
    pt: { title: "GIS e bancos", items: "ArcGIS Desktop/Pro/Online/Server, QGIS, Global Mapper, PostGIS, GeoServer, GeoNode" },
    en: { title: "GIS and databases", items: "ArcGIS Desktop/Pro/Online/Server, QGIS, Global Mapper, PostGIS, GeoServer, GeoNode" },
  },
  {
    pt: { title: "WebGIS e software", items: "React, Mapbox GL JS, Python, R, HTML/JavaScript, APIs REST, Streamlit, Power BI" },
    en: { title: "WebGIS and software", items: "React, Mapbox GL JS, Python, R, HTML/JavaScript, REST APIs, Streamlit, Power BI" },
  },
  {
    pt: { title: "Campo e fotogrametria", items: "Drone/RPAS, GNSS, Agisoft Metashape, Pix4D, Bentley, Trimble Business Center" },
    en: { title: "Field and photogrammetry", items: "Drone/RPAS, GNSS, Agisoft Metashape, Pix4D, Bentley, Trimble Business Center" },
  },
  {
    pt: { title: "Modelagem costeira", items: "Delft3D, XBeach, SMC — Sistema de Modelagem Costeira" },
    en: { title: "Coastal modelling", items: "Delft3D, XBeach, SMC — Coastal Modelling System" },
  },
];

