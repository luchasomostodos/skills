import React from "react";

/**
 * LuchIA Button — mirrors the shadcn button used across the equipo app.
 * Variants: default · destructive · outline · secondary · ghost · link
 * Sizes: default · sm · lg · icon
 */

const SHEET_ID = "lucia-button-styles";
const CSS = `
.lucia-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  white-space:nowrap;border-radius:var(--radius-md);font-family:var(--font-sans);
  font-size:var(--text-sm);font-weight:var(--fw-medium);cursor:pointer;border:1px solid transparent;
  transition:background-color var(--dur) var(--ease-out),color var(--dur) var(--ease-out),
  opacity var(--dur) var(--ease-out),border-color var(--dur) var(--ease-out);
  outline:none;line-height:1;}
.lucia-btn:focus-visible{box-shadow:0 0 0 2px var(--color-bg),0 0 0 4px var(--color-ring);}
.lucia-btn:disabled{pointer-events:none;opacity:.5;}
.lucia-btn svg{width:1rem;height:1rem;flex-shrink:0;}
.lucia-btn--default{background:var(--color-primary);color:var(--color-primary-fg);}
.lucia-btn--default:hover{background:hsl(222.2 47.4% 11.2% / .9);}
.lucia-btn--destructive{background:var(--color-destructive);color:#fff;}
.lucia-btn--destructive:hover{background:hsl(0 84.2% 60.2% / .9);}
.lucia-btn--outline{border-color:var(--color-border);background:var(--color-bg);color:var(--color-fg);}
.lucia-btn--outline:hover{background:var(--color-surface-muted);}
.lucia-btn--secondary{background:var(--color-secondary);color:var(--color-fg);}
.lucia-btn--secondary:hover{background:hsl(210 40% 92%);}
.lucia-btn--ghost{background:transparent;color:var(--color-fg);}
.lucia-btn--ghost:hover{background:var(--color-surface-muted);}
.lucia-btn--link{background:transparent;color:var(--color-primary);text-underline-offset:4px;}
.lucia-btn--link:hover{text-decoration:underline;}
.lucia-btn--size-default{height:2.5rem;padding:0 1rem;}
.lucia-btn--size-sm{height:2.25rem;padding:0 .75rem;border-radius:var(--radius-sm);}
.lucia-btn--size-lg{height:2.75rem;padding:0 2rem;}
.lucia-btn--size-icon{height:2.5rem;width:2.5rem;padding:0;}
`;

function useSheet() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById(SHEET_ID)) return;
    const el = document.createElement("style");
    el.id = SHEET_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  useSheet();
  const cls = `lucia-btn lucia-btn--${variant} lucia-btn--size-${size} ${className}`.trim();
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
