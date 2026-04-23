"use client";

import { forwardRef } from "react";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="font-display font-bold text-slate-700 ml-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={`w-full px-6 py-4 rounded-2xl border-4 ${
            error ? "border-red-200" : "border-slate-50"
          } focus:border-primary-soft focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none ${className}`}
          aria-invalid={!!error}
          {...props}
        />

        {error && <p className="text-sm text-red-600 ml-2">{error}</p>}
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";