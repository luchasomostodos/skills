import React from "react";

/**
 * LuchIA AlcancePill — % of target achieved, colored by threshold:
 * >= 100% verde · >= 70% amarillo · < 70% rojo. null → em-dash.
 * alcance is a ratio (e.g. 0.82 → "82%").
 */
export function AlcancePill({ alcance, compact = false }) {
  if (alcance === null || alcance === undefined) {
    return <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>—</span>;
  }
  const pct = Math.round(alcance * 100);
  const tone =
    alcance >= 1
      ? { bg: "var(--semaforo-verde-soft)", fg: "var(--semaforo-verde-text)" }
      : alcance >= 0.7
      ? { bg: "var(--semaforo-amarillo-soft)", fg: "var(--semaforo-amarillo-text)" }
      : { bg: "var(--semaforo-rojo-soft)", fg: "var(--semaforo-rojo-text)" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        fontVariantNumeric: "tabular-nums",
        background: tone.bg,
        color: tone.fg,
        fontSize: compact ? "var(--text-2xs)" : "var(--text-xs)",
        padding: compact ? "0.125rem 0.375rem" : "0.125rem 0.5rem",
        minWidth: compact ? 34 : 42,
      }}
    >
      {pct}%
    </span>
  );
}
