export default function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_12px_40px_rgba(26,46,74,0.16)]">
      <div className="flex items-center gap-2 border-b border-border bg-bg-alt px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs text-muted">
          geoportal.thgis · inteligência espacial
        </span>
      </div>
      <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[112px_1fr]">
        <aside className="space-y-3 bg-navy p-3 text-[10px] text-white/70 sm:p-4">
          <div className="mb-4 h-2 w-12 rounded bg-teal" />
          {["GeoPortal", "SIG Web", "Camadas", "Análise", "Campo"].map((item) => (
            <div
              key={item}
              className="rounded-md bg-white/10 px-2 py-1.5 text-[10px] font-medium"
            >
              {item}
            </div>
          ))}
        </aside>
        <div className="relative min-h-[220px] bg-[#d7e4dc] sm:min-h-[280px]">
          <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden>
            <rect width="400" height="260" fill="#c5d6cc" />
            <path
              d="M20 40 L90 30 L160 55 L210 40 L280 70 L360 50 L380 120 L300 160 L220 140 L140 180 L60 150 Z"
              fill="#2a8c6e"
              opacity="0.35"
            />
            <path
              d="M40 90 L120 80 L190 110 L250 90 L330 130 L370 200 L240 220 L150 200 L70 210 Z"
              fill="#1a2e4a"
              opacity="0.18"
            />
            <g stroke="#1a2e4a" strokeWidth="0.6" opacity="0.25">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`v${i}`} x1={40 + i * 42} y1="20" x2={40 + i * 42} y2="240" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} x1="20" y1={30 + i * 38} x2="380" y2={30 + i * 38} />
              ))}
            </g>
            <rect x="70" y="70" width="46" height="32" fill="#2a8c6e" opacity="0.7" />
            <rect x="160" y="100" width="52" height="38" fill="#1a2e4a" opacity="0.45" />
            <rect x="240" y="80" width="40" height="28" fill="#3db38a" opacity="0.8" />
            <circle cx="300" cy="150" r="6" fill="#2a8c6e" />
            <circle cx="120" cy="160" r="5" fill="#1a2e4a" />
          </svg>
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <div className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-navy shadow-sm">
              dados espaciais
            </div>
            <div className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-teal shadow-sm">
              GeoPortal ativo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
