/* LuchIA Portafolio — formato de números (es-PE, USD compacto) */
(function () {
  function fmtUsd(v, opts) {
    if (v == null || v === "") return "—";
    const n = Number(v); if (isNaN(n)) return "—";
    const abs = Math.abs(n), sign = n < 0 ? "-" : "";
    if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(abs >= 1e7 ? 1 : 2)}M`;
    if (abs >= 1e3) return `${sign}$${Math.round(abs / 1e3)}K`;
    return `${sign}$${Math.round(abs)}`;
  }
  function fmtUsdFull(v) {
    if (v == null || v === "") return "—";
    const n = Number(v); if (isNaN(n)) return "—";
    return "$" + Math.round(n).toLocaleString("es-PE", { maximumFractionDigits: 0 });
  }
  function fmtNum(v) {
    if (v == null || v === "") return "—";
    const n = Number(v); if (isNaN(n)) return "—";
    if (Math.abs(n) >= 1e3) return n.toLocaleString("es-PE", { maximumFractionDigits: 0 });
    return String(n);
  }
  // porcentaje de cap-table (puntos %): "6.0%" / "—" / "0%"
  function fmtCapPct(v, dim) {
    if (v == null) return "—";
    const n = Number(v);
    if (n === 0) return "0%";
    return `${n.toFixed(n % 1 === 0 ? 0 : 1)}%`;
  }
  function fmtPct(v, digits) {
    if (v == null) return "—";
    return `${(v * 100).toFixed(digits == null ? 0 : digits)}%`;
  }
  function fmtSignedPct(v) {
    if (v == null) return "—";
    const s = v * 100;
    return `${s >= 0 ? "+" : ""}${s.toFixed(0)}%`;
  }
  // delta en puntos porcentuales (para cap-table): "+2 pp"
  function fmtPp(v) {
    if (v == null) return "—";
    return `${v >= 0 ? "+" : ""}${v.toFixed(v % 1 === 0 ? 0 : 1)} pp`;
  }
  function fmtMoic(v) { return v == null ? "—" : `${v.toFixed(2)}x`; }
  function fmtVal(v, unidad) { return unidad === "usd" ? fmtUsd(v) : fmtNum(v); }

  window.PFmt = { fmtUsd, fmtUsdFull, fmtNum, fmtCapPct, fmtPct, fmtSignedPct, fmtPp, fmtMoic, fmtVal };
})();
