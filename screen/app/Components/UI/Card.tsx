'use client';

import * as React from 'react';
import { cn } from '../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

type CardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
    hoverable?: boolean;
    children?: React.ReactNode;
};

export const Card = ({
    className,
    hoverable = true,
    children,
    ...props
}: CardProps) => {
    return (
        <motion.div
            whileHover={hoverable ? { y: -8, scale: 1.01 } : undefined}
            className={cn('disney-card p-6', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

Card.displayName = 'Card';