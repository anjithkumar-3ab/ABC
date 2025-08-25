import React from 'react';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${className || ''}`}
      {...props}
    />
  );
}
