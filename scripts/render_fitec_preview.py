from io import BytesIO
from pathlib import Path
from urllib.request import urlretrieve

import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch
from PIL import Image

ROOT = Path(r"f:\site_pessoal")
TMP = ROOT / "scripts" / "_fitec_tmp"
OUT = ROOT / "public" / "portfolio"
TMP.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

BASE = "https://raw.githubusercontent.com/Tiagofholanda/Dashboard_FITec/main"
csv_path = TMP / "dados.csv"
shp_base = TMP / "linhas"
urlretrieve(f"{BASE}/data/dados.csv", csv_path)
for ext in (".shp", ".shx", ".dbf", ".prj", ".cpg"):
    urlretrieve(f"{BASE}/data/2024-10-16{ext}", Path(str(shp_base) + ext))

encodings = ["utf-8", "latin1", "cp1252"]
df = None
for enc in encodings:
    try:
        df = pd.read_csv(csv_path, sep=";", encoding=enc)
        break
    except Exception:
        continue
if df is None:
    raise RuntimeError("Could not read FITec CSV")

df.columns = (
    df.columns.str.normalize("NFKD")
    .str.encode("ascii", "ignore")
    .str.decode("ascii")
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)
df["data"] = pd.to_datetime(df["data"], format="%d/%m/%Y", errors="coerce")
df = df.dropna(subset=["data"])
if "numero_de_pontos" in df.columns:
    df["numero_de_pontos"] = pd.to_numeric(df["numero_de_pontos"], errors="coerce").fillna(0)
else:
    df["numero_de_pontos"] = 0
if "extensao" in df.columns:
    df["extensao"] = pd.to_numeric(df["extensao"], errors="coerce").fillna(0)
else:
    df["extensao"] = 0

daily = df.groupby(df["data"].dt.date)["numero_de_pontos"].sum()
total_pts = int(df["numero_de_pontos"].sum())
meta = 101457
pct = min(100.0, (total_pts / meta) * 100)
km = df["extensao"].sum() / 1000

gdf = gpd.read_file(str(shp_base) + ".shp")
if gdf.crs and gdf.crs.to_epsg() != 4326:
    gdf = gdf.to_crs(4326)

navy = "#1a2e4a"
teal = "#2a8c6e"
muted = "#5c6b80"
bg = "#e8eef4"

fig = plt.figure(figsize=(13.2, 7.4), facecolor=bg)
gs = fig.add_gridspec(2, 3, height_ratios=[0.28, 0.72], hspace=0.28, wspace=0.18, left=0.05, right=0.97, top=0.9, bottom=0.08)

fig.text(0.05, 0.94, "Dashboard FITec", fontsize=20, fontweight="bold", color=navy)
fig.text(0.05, 0.905, "Acompanhamento de pontos, meta e rede levantada", fontsize=10, color=muted)

kpis = [
    (f"{total_pts:,}".replace(",", "."), "Pontos realizados"),
    (f"{pct:.1f}%", "Progresso da meta"),
    (f"{km:.1f} km", "Extensão levantada"),
]
for i, (value, label) in enumerate(kpis):
    ax = fig.add_subplot(gs[0, i])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    box = FancyBboxPatch((0.02, 0.08), 0.96, 0.84, boxstyle="round,pad=0.02,rounding_size=0.08", facecolor="white", edgecolor="#d5dde6", linewidth=1)
    ax.add_patch(box)
    ax.text(0.08, 0.58, value, fontsize=22, fontweight="bold", color=navy, va="center")
    ax.text(0.08, 0.28, label, fontsize=10, color=muted, va="center")

ax_chart = fig.add_subplot(gs[1, 0:2])
ax_chart.plot(pd.to_datetime(daily.index), daily.values, color=teal, linewidth=2.2)
ax_chart.fill_between(pd.to_datetime(daily.index), daily.values, color=teal, alpha=0.12)
ax_chart.set_title("Evolução diária de pontos", loc="left", fontsize=11, color=navy, pad=8)
ax_chart.set_facecolor("white")
ax_chart.tick_params(colors=muted, labelsize=8)
for spine in ax_chart.spines.values():
    spine.set_color("#d5dde6")
ax_chart.grid(axis="y", color="#e4ebf1", linewidth=0.8)

ax_map = fig.add_subplot(gs[1, 2])
gdf.plot(ax=ax_map, color=teal, linewidth=0.6, alpha=0.85)
ax_map.set_title("Rede no mapa", loc="left", fontsize=11, color=navy, pad=8)
ax_map.set_facecolor("#d7e4dc")
ax_map.set_xticks([])
ax_map.set_yticks([])
for spine in ax_map.spines.values():
    spine.set_color("#d5dde6")

preview = TMP / "fitec-raw.png"
fig.savefig(preview, dpi=140)
plt.close(fig)

im = Image.open(preview).convert("RGB")
w, h = im.size
if w > 1400:
    im = im.resize((1400, int(h * 1400 / w)), Image.Resampling.LANCZOS)
dest = OUT / "fitec.jpg"
im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
print(f"saved {dest} ({dest.stat().st_size // 1024}KB)")
