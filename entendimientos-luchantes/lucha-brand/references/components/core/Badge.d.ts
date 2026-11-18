import * as React from "react";

export type BadgeVariant = "default" | "secondary" | "outline" | "success";

/** Small pill for labels & statuses. `success` is the emerald "Levantando" capsule; set `uppercase` for micro eyebrow tags. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  uppercase?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
