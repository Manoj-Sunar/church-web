"use client";

import React, { forwardRef } from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerClassName = "",
      className = "",
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

    const ringClass = error
      ? "border-red-200 focus:border-red-300 focus:ring-4 focus:ring-red-500/10"
      : "border-slate-50 focus:border-primary-soft focus:ring-4 focus:ring-primary/10";

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-display font-bold text-slate-700 ml-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full py-4 rounded-2xl border-4 transition-all",
              leftIcon ? "pl-12 pr-4" : "px-6",
              rightIcon ? "pr-12" : "",
              ringClass,
              "focus:outline-none",
              className,
            ].join(" ")}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600 ml-2">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-help`} className="text-sm text-slate-500 ml-2">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";