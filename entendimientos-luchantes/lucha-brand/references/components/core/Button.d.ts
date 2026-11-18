import * as React from "react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

/**
 * Primary action control for the LuchIA equipo app. `default` is the
 * near-black ink button; `outline`/`ghost` for secondary actions in toolbars.
 *
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x180"
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button(props: ButtonProps): JSX.Element;
