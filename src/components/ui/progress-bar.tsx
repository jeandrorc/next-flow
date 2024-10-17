"use client";

import React from "react";

interface ProgressBarProps {
  value?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, className }) => {
  const isIndeterminate = value === undefined;

  return (
    <div className={`w-full bg-gray-300 rounded-full h-1 overflow-hidden ${className}`}>
      {isIndeterminate ? (
        <div className="bg-amber-500 h-full rounded-full animate-progress" />
      ) : (
        <div
          className="bg-amber-500 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      )}
    </div>
  );
};
