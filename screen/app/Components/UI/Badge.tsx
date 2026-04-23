import { cn } from '@/app/utils/cn';
import React from 'react';


interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'primary-soft';
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export const Badge = ({ className, variant = 'primary', children, ...props }: BadgeProps) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    outline: 'border-2 border-slate-200 text-slate-600',
    'primary-soft': 'bg-primary-soft text-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};