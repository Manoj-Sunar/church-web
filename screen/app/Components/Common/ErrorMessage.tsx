"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ message, onRetry, className = "" }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 border-4 border-red-100 rounded-2xl md:p-6 p-2 ${className}`}
    >
      <div className="flex md:items-start items-center gap-4">
        <div className="bg-red-100 rounded-full p-2">
          <AlertCircle className="text-red-600" size={24} />
        </div>
        <div className="flex-1">
          <p className="text-red-700">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}