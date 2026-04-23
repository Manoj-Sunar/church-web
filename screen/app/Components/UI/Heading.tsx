import React, { memo } from 'react';
import { cn } from '../../utils/cn';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: React.ReactNode;
    className?: string;
}

export const Heading = memo(({ level = 1, className, children, ...props }: HeadingProps) => {
    const Tag = `h${level}` as React.ElementType;

    const sizes = {
        1: 'text-4xl md:text-5xl text-primary',
        2: 'text-3xl md:text-5xl text-slate-800',
        3: 'text-2xl md:text-4xl text-slate-800',
        4: 'text-xl md:text-2xl text-slate-800',
        5: 'text-lg md:text-xl text-slate-800',
        6: 'text-base md:text-lg text-slate-800',
    };

    return (
        <Tag className={cn('font-display font-bold leading-tight', sizes[level], className)} {...props}>
            {children}
        </Tag>
    );
});