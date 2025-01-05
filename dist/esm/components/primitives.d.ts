/**
 * Primitive components - like buttons - for testing
 * From different component libraries & techniques
 */
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
export declare const buttonVariants: (props?: {
    variant?: "default" | "secondary" | "destructive";
    size?: "sm" | "lg" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
/**
 * A reusable button component with various style variants
 * @param props - Button properties including variant and size
 * @returns A styled button component
 */
export declare const RButton: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=primitives.d.ts.map