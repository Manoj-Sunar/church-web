"use client";

import React, { memo, useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/app/Components/UI/Button/Button";
import { Heading } from "@/app/Components/UI/Heading";
import { Paragraph } from "../Typography/TypoGraphy";

type Ease = [number, number, number, number];

export type SuccessMessageProps = {
  title: string;
  description?: React.ReactNode;
  icon: LucideIcon;

  iconFilled?: boolean;

  primaryAction?: {
    label: string;
    onClick: () => void;
  };

  secondaryAction?: {
    label: string;
    onClick: () => void;
  };

  duration?: number;
  ease?: Ease;

  /** Auto hide in ms (default: 4000ms) */
  autoHideDuration?: number;

  className?: string;
};

const DEFAULT_EASE: Ease = [0.22, 1, 0.36, 1];

export const SuccessMessage = memo(function SuccessMessage({
  title,
  description,
  icon: Icon,

  iconFilled = false,

  primaryAction,
  secondaryAction,

  duration = 0.3,
  ease = DEFAULT_EASE,
  autoHideDuration = 4000,

  className = "",
}: SuccessMessageProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // Auto hide logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  const iconClassName = useMemo(() => {
    return iconFilled ? "text-primary fill-primary" : "text-primary";
  }, [iconFilled]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration, ease }}
          className={`
            w-full 
            flex
            border
            mx-auto 
            px-4 sm:px-6 
            py-6 
            text-center 
            ${className}
          `}
        >
          {/* Card Container */}
          <div className="bg-white shadow-lg rounded-2xl  w-full flex items-center gap-5">

          <div>
              {/* Icon */}
            <div className="bg-primary-soft rounded-full flex items-center justify-center mx-auto gap-2 w-12 h-12">
              <Icon className={iconClassName} size={30} />
            </div>

            {/* Title */}
            <Heading level={5} className="mb-3 text-sm">
              {title}
            </Heading>
          </div>

            {/* Description */}
            {description && (
              typeof description === "string" ? (
                <Paragraph className="text-slate-600 mb-6 text-2xl sm:text-base leading-relaxed">
                  {description}
                </Paragraph>
              ) : (
                <div className="text-slate-600 mb-6">{description}</div>
              )
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {secondaryAction && (
                  <Button
                    variant="outline"
                    onClick={secondaryAction.onClick}
                    className="w-full sm:w-auto"
                  >
                    {secondaryAction.label}
                  </Button>
                )}

                {primaryAction && (
                  <Button
                    onClick={primaryAction.onClick}
                    className="w-full sm:w-auto"
                  >
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});