import React from 'react';

export function Button({ children, className, variant = "default", size = "default", ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantStyles = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900"
  };
  
  const sizeStyles = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
