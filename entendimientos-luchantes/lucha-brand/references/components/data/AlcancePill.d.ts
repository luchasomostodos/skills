/**
 * Percent-of-target pill, color-coded by achievement threshold
 * (verde ≥ 100% · amarillo ≥ 70% · rojo < 70%). Used in the KPI table.
 */
export interface AlcancePillProps {
  /** ratio achieved, e.g. 0.82 → "82%". null renders an em-dash. */
  alcance: number | null;
  /** tighter padding/size for inline quarterly cells */
  compact?: boolean;
}

export function AlcancePill(props: AlcancePillProps): JSX.Element;
