'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { getButtonClasses } from './ButtonBase';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children?: React.ReactNode; // ✅ force ReactNode only
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading,
            disabled,
            children,
            type,
            ...props
        },
        ref
    ) => {
        const isDisabled = Boolean(disabled || isLoading);

        return (
            <motion.button
                ref={ref}
                type={type ?? 'button'}
                whileHover={isDisabled ? undefined : { scale: 1.05, y: -2 }}
                whileTap={isDisabled ? undefined : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={getButtonClasses(variant, size, className)}
                disabled={isDisabled}
                {...props}
            >
                {isLoading && (
                    <span
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                )}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';