export const PRIVATE_BUCKET = "projetos-privados";

export const publicProjects = [
  {
    key: "sinigc",
    image: "/portfolio/sinigc.jpg",
    href: "https://tiagofholanda.github.io/sinigc-page/pt/#inicio",
  },
  {
    key: "fitec",
    image: "/portfolio/fitec.jpg",
    href: "https://github.com/Tiagofholanda/Dashboard_FITec",
  },
  {
    key: "aero",
    image: "/portfolio/aero.jpg",
  },
  { key: "coastal" },
  { key: "research" },
  { key: "teaching" },
] as const;

export const privateProjects = [
  {
    key: "webgis_municipal",
    storagePath: "webgis-municipal.jpg",
    images: [
      "/restricted/webgis-municipal.jpg",
      "/restricted/webgis-municipal-2.jpg",
      "/restricted/webgis-municipal-3.jpg",
      "/restricted/webgis-municipal-4.jpg",
    ],
  },
  {
    key: "webgis_devgis",
    storagePath: "webgis-devgis.jpg",
    images: [
      "/restricted/webgis-devgis.jpg",
      "/restricted/webgis-devgis-2.jpg",
    ],
  },
  {
    key: "webgis_audit",
    storagePath: "webgis-audit.jpg",
    images: ["/restricted/webgis-audit.jpg", "/restricted/webgis-audit-2.jpg"],
  },
  {
    key: "webgis_epi",
    storagePath: "webgis-epi.jpg",
    images: ["/restricted/webgis-epi.jpg", "/restricted/webgis-epi-2.jpg"],
  },
  {
    key: "spatial_db",
    storagePath: "spatial-db.jpg",
    images: [
      "/restricted/spatial-db.jpg",
      "/restricted/spatial-db-2.jpg",
      "/restricted/spatial-db-3.jpg",
    ],
  },
  {
    key: "inconsistencias",
    storagePath: "inconsistencias.jpg",
    images: [
      "/restricted/inconsistencias.jpg",
      "/restricted/inconsistencias-2.jpg",
    ],
  },
  {
    key: "topo",
    storagePath: "topo.jpg",
    images: ["/restricted/topo.jpg", "/restricted/topo-2.jpg"],
  },
  {
    key: "metashape",
    storagePath: "metashape-2.jpg",
    images: [
      "/restricted/metashape-2.jpg",
      "/restricted/metashape-3.jpg",
      "/restricted/metashape-4.jpg",
      "/restricted/metashape-5.jpg",
    ],
  },
  {
    key: "artigos",
    storagePath: "artigo-1.jpg",
    images: [
      "/restricted/artigo-1.jpg",
      "/restricted/artigo-2.jpg",
      "/restricted/artigo-3.jpg",
      "/restricted/artigo-4.jpg",
    ],
  },
] as const;
