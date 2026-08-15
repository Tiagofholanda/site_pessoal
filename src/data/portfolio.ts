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
    localPath: "/restricted/webgis-municipal.jpg",
  },
  {
    key: "webgis_devgis",
    storagePath: "webgis-devgis.jpg",
    localPath: "/restricted/webgis-devgis.jpg",
  },
  {
    key: "webgis_audit",
    storagePath: "webgis-audit.jpg",
    localPath: "/restricted/webgis-audit.jpg",
  },
  {
    key: "webgis_epi",
    storagePath: "webgis-epi.jpg",
    localPath: "/restricted/webgis-epi.jpg",
  },
  {
    key: "spatial_db",
    storagePath: "spatial-db.jpg",
    localPath: "/restricted/spatial-db.jpg",
  },
] as const;
