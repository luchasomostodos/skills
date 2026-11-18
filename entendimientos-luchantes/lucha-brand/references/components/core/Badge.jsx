import React from "react";

/**
 * LuchIA Badge / Tag — small status & label pill. Variants:
 * default (ink), secondary (muted), outline, and the "levantando"
 * style emerald capsule used in the portfolio table.
 */
const VARIANTS = {
  default: { background: "var(--color-primary)", color: "var(--color-primary-fg)", border: "1px solid transparent" },
  secondary: { background: "var(--color-secondary)", color: "var(--color-fg)", border: "1px solid transparent" },
  outline: { background: "transparent", color: "var(--color-fg)", border: "1px solid var(--color-border)" },
  success: { background: "var(--semaforo-verde-soft)", color: "var(--semaforo-verde-text)", border: "1px solid transparent" },
};

export function Badge({ variant = "default", uppercase = false, className = "", style, children, ...props }) {
  const v = VARIANTS[variant] ?? VARIANTS.default;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        borderRadius: "var(--radius-full)",
        padding: "0.125rem 0.625rem",
        fontFamily: "var(--font-sans)",
        fontSize: uppercase ? "var(--text-2xs)" : "var(--text-xs)",
        fontWeight: "var(--fw-medium)",
        lineHeight: 1.5,
        letterSpacing: uppercase ? "var(--tracking-wider)" : "0",
        textTransform: uppercase ? "uppercase" : "none",
        whiteSpace: "nowrap",
        ...v,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
