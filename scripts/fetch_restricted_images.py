from pathlib import Path
import urllib.request
from PIL import Image

dest = Path(r"f:\site_pessoal\public\restricted")
dest.mkdir(parents=True, exist_ok=True)

base = "https://raw.githubusercontent.com/Tiagofholanda/tiagoportfolio/main/Imagem"
sources = {
    "webgis-municipal.jpg": f"{base}/webgis_4/Captura%20de%20tela%202025-11-29%20083232.png",
    "webgis-devgis.jpg": f"{base}/webgis_devgis/devgis1.png",
    "webgis-audit.jpg": f"{base}/webgis_2/Captura%20de%20tela%202025-11-29%20123215.png",
    "webgis-epi.jpg": f"{base}/webgis_3/Captura%20de%20tela%202025-11-29%20083316.png",
    "spatial-db.jpg": f"{base}/gerenciamento%20de%20banco%20de%20dados%20espacial/banco1.png",
    "aero.jpg": f"{base}/agisoft/agisoft1.png",
}

for name, url in sources.items():
    raw = dest / f"_raw_{name}"
    print(f"Downloading {name}...")
    urllib.request.urlretrieve(url, raw)
    im = Image.open(raw).convert("RGB")
    w, h = im.size
    if w > 1400:
        im = im.resize((1400, int(h * 1400 / w)), Image.Resampling.LANCZOS)
    out = dest / name
    im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
    raw.unlink()
    print(f"  -> {out.stat().st_size // 1024}KB")
