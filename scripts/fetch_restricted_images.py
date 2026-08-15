from pathlib import Path
import urllib.request
from PIL import Image

dest = Path(r"f:\site_pessoal\public\restricted")
dest.mkdir(parents=True, exist_ok=True)

base = "https://raw.githubusercontent.com/Tiagofholanda/tiagoportfolio/main/Imagem"
sources = {
    "webgis-municipal.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20083232.png",
    "webgis-municipal-2.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20083304.png",
    "webgis-municipal-3.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20084753.png",
    "webgis-municipal-4.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20084835.png",
    "webgis-devgis.jpg": f"{base}/webgis_devgis/devgis1.png",
    "webgis-devgis-2.jpg": f"{base}/webgis_devgis/devgis2.png",
    "webgis-audit.jpg": f"{base}/webgis_2/Captura%20de%20tela%202025-11-29%20123215.png",
    "webgis-audit-2.jpg": f"{base}/webgis_2/webgis4.png",
    "webgis-epi.jpg": f"{base}/webgis_3/Captura%20de%20tela%202025-11-29%20083316.png",
    "webgis-epi-2.jpg": f"{base}/webgis_3/webgis3.png",
    "spatial-db.jpg": f"{base}/gerenciamento%20de%20banco%20de%20dados%20espacial/banco1.png",
    "spatial-db-2.jpg": f"{base}/gerenciamento%20de%20banco%20de%20dados%20espacial/banco2.png",
    "spatial-db-3.jpg": f"{base}/gerenciamento%20de%20banco%20de%20dados%20espacial/banco3.png",
    "inconsistencias.jpg": f"{base}/inconsistencias%20em%20banco%20de%20dados%20espacial/inconsistencias.png",
    "inconsistencias-2.jpg": f"{base}/inconsistencias%20em%20banco%20de%20dados%20espacial/Captura%20de%20tela%202025-11-29%20123143.png",
    "topo.jpg": f"{base}/topografia/1.png",
    "topo-2.jpg": f"{base}/topografia/2.png",
    "metashape-2.jpg": f"{base}/agisoft/agisoft2.png",
    "metashape-3.jpg": f"{base}/agisoft/agisoft3.png",
    "metashape-4.jpg": f"{base}/agisoft/agisoft4.png",
    "metashape-5.jpg": f"{base}/agisoft/agisoft5.png",
    "artigo-1.jpg": f"{base}/artigos/artigo1.png",
    "artigo-2.jpg": f"{base}/artigos/artigo2.png",
    "artigo-3.jpg": f"{base}/artigos/artigo3.png",
    "artigo-4.jpg": f"{base}/artigos/artigo4.png",
}

for name, url in sources.items():
    out = dest / name
    raw = dest / f"_raw_{name}"
    print(f"Downloading {name}...")
    urllib.request.urlretrieve(url, raw)
    im = Image.open(raw).convert("RGB")
    w, h = im.size
    if w > 1400:
        im = im.resize((1400, int(h * 1400 / w)), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
    raw.unlink()
    print(f"  -> {out.stat().st_size // 1024}KB")
