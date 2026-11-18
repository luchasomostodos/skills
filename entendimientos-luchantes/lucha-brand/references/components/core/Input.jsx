import React from "react";

const SHEET_ID = "lucia-input-styles";
const CSS = `
.lucia-input{display:flex;height:2.5rem;width:100%;border-radius:var(--radius-md);
  border:1px solid var(--color-border);background:var(--color-bg);padding:0 .75rem;
  font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-fg);
  transition:border-color var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out);outline:none;}
.lucia-input::placeholder{color:var(--color-text-muted);}
.lucia-input:focus-visible{border-color:hsl(222.2 47.4% 11.2% / .3);
  box-shadow:0 0 0 2px hsl(222.2 47.4% 11.2% / .15);}
.lucia-input:disabled{cursor:not-allowed;opacity:.5;}
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

/** LuchIA text input — the shadcn input skin (h-10, hairline border, ring on focus). */
export function Input({ className = "", type = "text", ...props }) {
  useSheet();
  return <input type={type} className={`lucia-input ${className}`.trim()} {...props} />;
}
