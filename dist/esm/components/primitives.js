import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Primitive components - like buttons - for testing
 * From different component libraries & techniques
 */
// NPM packages
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn, } from '../index.js';
// Suggested by Claude
export const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        },
        size: {
            default: 'h-10 py-2 px-4',
            sm: 'h-9 px-3',
            lg: 'h-11 px-8',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
/**
 * A reusable button component with various style variants
 * @param props - Button properties including variant and size
 * @returns A styled button component
 */
export const RButton = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (_jsx("button", { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
RButton.displayName = 'Button';
//# sourceMappingURL=primitives.js.map