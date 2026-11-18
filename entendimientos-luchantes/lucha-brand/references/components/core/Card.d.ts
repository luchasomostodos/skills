import * as React from "react";

/**
 * Surface primitive: hairline border, soft shadow, var(--radius-lg).
 * Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
