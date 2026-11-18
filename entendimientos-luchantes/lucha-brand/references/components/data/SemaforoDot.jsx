import React from "react";

const DOT = {
  verde: "var(--semaforo-verde)",
  amarillo: "var(--semaforo-amarillo)",
  rojo: "var(--semaforo-rojo)",
  gris: "var(--semaforo-gris)",
};
const TEXT = {
  verde: "var(--semaforo-verde-text)",
  amarillo: "var(--semaforo-amarillo-text)",
  rojo: "var(--semaforo-rojo-text)",
  gris: "var(--semaforo-gris-text)",
};
const LABEL = { verde: "Cumple", amarillo: "Por cumplir", rojo: "No cumple", gris: "Sin datos" };

/**
 * LuchIA SemaforoDot — the control-tower status indicator.
 * Renders a ringed colored dot, optionally with its label.
 * estado: "verde" | "amarillo" | "rojo" | "gris" | null
 */
export function SemaforoDot({ estado, showLabel = true, size = 10 }) {
  if (!estado) {
    return <span style={{ color: "var(--color-text-subtle)" }}>—</span>;
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        aria-hidden
        style={{
          height: size,
          width: size,
          borderRadius: "var(--radius-full)",
          background: DOT[estado],
          boxShadow: "0 0 0 2px var(--color-bg)",
          flexShrink: 0,
        }}
      />
      {showLabel && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--fw-medium)",
            color: "var(--color-fg)",
            opacity: 0.7,
          }}
        >
          {LABEL[estado]}
        </span>
      )}
    </span>
  );
}
