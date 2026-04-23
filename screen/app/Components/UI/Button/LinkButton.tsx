'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { motion } from 'framer-motion';
import { getButtonClasses, ButtonBaseProps } from './ButtonBase';

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonBaseProps['variant'];
  size?: ButtonBaseProps['size'];
}

export function LinkButton({
  href,
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: LinkButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={getButtonClasses(variant!, size!, className)}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}