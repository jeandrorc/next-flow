"use client";

import React from "react";

interface SpinnerProps {
  size?: number;
  hide?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, hide = false }) => {
  if (hide) return null;

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-amber-500`}
      style={{ width: `${size}px`, height: `${size}px` }}
      data-testid="spinner"
    />
  );
};
