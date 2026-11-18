export type Semaforo = "verde" | "amarillo" | "rojo" | "gris";

/**
 * Control-tower status indicator: a ringed colored dot with optional
 * Spanish label (Cumple / Por cumplir / No cumple / Sin datos).
 * The signature element of the LuchIA equipo surfaces.
 *
 * @startingPoint section="Data" subtitle="Semáforo dots & alcance pills" viewport="700x160"
 */
export interface SemaforoDotProps {
  estado: Semaforo | null;
  showLabel?: boolean;
  size?: number;
}

export function SemaforoDot(props: SemaforoDotProps): JSX.Element;
