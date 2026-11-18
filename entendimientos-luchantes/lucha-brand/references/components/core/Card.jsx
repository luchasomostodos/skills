import React from "react";

/**
 * LuchIA Card — hairline border + soft shadow surface used for every
 * panel in the equipo app (hero KPIs, table containers, detail blocks).
 */
export function Card({ className = "", style, children, ...props }) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-card)",
        color: "var(--color-fg)",
        boxShadow: "var(--shadow-card)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", style, children, ...props }) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "0.375rem", padding: "1.5rem", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className = "", style, children, ...props }) {
  return (
    <h3
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xl)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--tracking-tight)",
        lineHeight: "var(--leading-none)",
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", style, children, ...props }) {
  return (
    <p
      className={className}
      style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", margin: 0, ...style }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className = "", style, children, ...props }) {
  return (
    <div className={className} style={{ padding: "1.5rem", paddingTop: 0, ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", style, children, ...props }) {
  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", padding: "1.5rem", paddingTop: 0, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
