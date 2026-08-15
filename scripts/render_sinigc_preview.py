from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from PIL import Image

OUT = Path(r"f:\site_pessoal\public\portfolio")
OUT.mkdir(parents=True, exist_ok=True)

navy = "#0f2744"
teal = "#2a8c6e"
sand = "#d9e4ee"
muted = "#8aa0b5"

fig = plt.figure(figsize=(13.2, 7.4), facecolor=navy)
ax = fig.add_axes([0, 0, 1, 1])
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.axis("off")

ax.add_patch(FancyBboxPatch((0.04, 0.08), 0.92, 0.84, boxstyle="round,pad=0.01,rounding_size=0.02", facecolor="#163250", edgecolor="#2c4a68", linewidth=1))
ax.text(0.08, 0.78, "SINIGC", fontsize=28, fontweight="bold", color="white")
ax.text(0.08, 0.70, "Sistema Nacional Integrado de Inteligência e Gestão Costeira", fontsize=11, color=muted)
ax.text(0.08, 0.58, "Observar, medir e decidir\ncom território, tempo e proveniência.", fontsize=16, color="white", linespacing=1.35)

steps = ["Campo", "Dado", "Mapa", "Análise", "Risco", "Decisão"]
for i, step in enumerate(steps):
    x = 0.08 + i * 0.145
    ax.add_patch(FancyBboxPatch((x, 0.22), 0.13, 0.18, boxstyle="round,pad=0.01,rounding_size=0.02", facecolor="#1c3d5c", edgecolor=teal, linewidth=1))
    ax.text(x + 0.065, 0.345, f"{i+1:02d}", fontsize=9, color=teal, ha="center")
    ax.text(x + 0.065, 0.28, step, fontsize=10, color="white", ha="center")

ax.text(0.08, 0.14, "Órgãos ambientais  ·  Academia  ·  PostGIS  ·  React  ·  QGIS", fontsize=10, color=sand)

raw = OUT / "_sinigc-raw.png"
fig.savefig(raw, dpi=140)
plt.close(fig)

im = Image.open(raw).convert("RGB")
w, h = im.size
if w > 1400:
    im = im.resize((1400, int(h * 1400 / w)), Image.Resampling.LANCZOS)
dest = OUT / "sinigc.jpg"
im.save(dest, "JPEG", quality=84, optimize=True, progressive=True)
raw.unlink()
print(f"saved {dest} ({dest.stat().st_size // 1024}KB)")
