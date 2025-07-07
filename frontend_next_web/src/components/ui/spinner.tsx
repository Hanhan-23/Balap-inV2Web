// components/ui/LoaderSpinner.tsx
import { SpinnerGapIcon } from "@phosphor-icons/react";

export function LoaderSpinner({ size = 32, className = "" }) {
  return (
    <SpinnerGapIcon
      className={`animate-spin-linear text-black ${className}`}
      size={size}
      weight="regular"
      aria-label="Loading"
      role="status"
    />
  );
}
