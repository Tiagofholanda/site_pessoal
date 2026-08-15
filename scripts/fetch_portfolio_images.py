from pathlib import Path
import urllib.request
from PIL import Image

dest = Path(r"f:\site_pessoal\public\portfolio")
dest.mkdir(parents=True, exist_ok=True)

base = "https://raw.githubusercontent.com/Tiagofholanda/tiagoportfolio/main/Imagem"
sources = {
    "hero.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20084803.png",
    "webgis-municipal.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20083232.png",
    "webgis-devgis.jpg": f"{base}/webgis_devgis/devgis1.png",
    "webgis-audit.jpg": f"{base}/webgis_2/Captura%20de%20tela%202025-11-29%20123215.png",
    "webgis-epi.jpg": f"{base}/webgis_3/Captura%20de%20tela%202025-11-29%20083316.png",
    "spatial-db.jpg": f"{base}/gerenciamento%20de%20banco%20de%20dados%20espacial/banco1.png",
    "aero.jpg": f"{base}/agisoft/agisoft1.png",
    "topo.jpg": f"{base}/topografia/1.png",
    "inconsistencias.jpg": f"{base}/inconsistencias%20em%20banco%20de%20dados%20espacial/inconsistencias.png",
}

for name, url in sources.items():
    raw = dest / f"_raw_{name}"
    print(f"Downloading {name}...")
    urllib.request.urlretrieve(url, raw)
    im = Image.open(raw).convert("RGB")
    w, h = im.size
    max_w = 1600 if name == "hero.jpg" else 1200
    if w > max_w:
        im = im.resize((max_w, int(h * max_w / w)), Image.Resampling.LANCZOS)
    out = dest / name
    im.save(out, "JPEG", quality=76 if name == "hero.jpg" else 78, optimize=True, progressive=True)
    raw.unlink()
    print(f"  -> {out.stat().st_size // 1024}KB")
