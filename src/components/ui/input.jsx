import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${className || ''}`}
      {...props}
    />
  );
}
