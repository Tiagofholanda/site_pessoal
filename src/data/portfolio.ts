export const PRIVATE_BUCKET = "projetos-privados";

export const publicProjects = [
  {
    key: "fitec",
    image: "/portfolio/fitec.jpg",
    href: "https://github.com/Tiagofholanda/Dashboard_FITec",
  },
  { key: "coastal" },
  { key: "research" },
  { key: "teaching" },
] as const;

export const privateProjects = [
  { key: "webgis_municipal", storagePath: "webgis-municipal.jpg" },
  { key: "webgis_devgis", storagePath: "webgis-devgis.jpg" },
  { key: "webgis_audit", storagePath: "webgis-audit.jpg" },
  { key: "webgis_epi", storagePath: "webgis-epi.jpg" },
  { key: "spatial_db", storagePath: "spatial-db.jpg" },
  { key: "aero", storagePath: "aero.jpg" },
] as const;
