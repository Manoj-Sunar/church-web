import React from 'react';
import { cn } from '../../utils/cn';

export const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center justify-center py-12', className)}>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
};