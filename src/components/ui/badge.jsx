import React from 'react';

export function Badge({ children, className, variant = "default", ...props }) {
  const variantStyles = {
    default: "bg-green-600 text-white",
    secondary: "bg-slate-100 text-slate-900",
    destructive: "bg-red-500 text-white"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant] || ''} ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  );
}
