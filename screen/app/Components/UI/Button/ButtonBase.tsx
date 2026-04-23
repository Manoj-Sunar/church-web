import { cn } from '@/app/utils/cn';
import * as React from 'react';


export type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary/90 disney-shadow',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 disney-shadow',
  outline: 'border-4 border-primary text-primary hover:bg-primary-soft',
  ghost: 'text-primary hover:bg-primary-soft',
};

export const buttonSizes = {
  sm: 'px-4 py-2 text-sm rounded-2xl',
  md: 'px-6 py-3 text-base rounded-3xl',
  lg: 'px-8 py-4 text-lg rounded-4xl',
};

export function getButtonClasses(
  variant: keyof typeof buttonVariants,
  size: keyof typeof buttonSizes,
  className?: string
) {
  return cn(
    'inline-flex items-center justify-center font-display font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none disney-button-pop',
    buttonVariants[variant],
    buttonSizes[size],
    className
  );
}