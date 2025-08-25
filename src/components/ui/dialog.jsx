import React from 'react';

export function Dialog({ children, open, onOpenChange }) {
  if (!open) return children;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {children}
    </div>
  );
}

export function DialogTrigger({ children, asChild, ...props }) {
  return React.cloneElement(children, props);
}

export function DialogContent({ children, className, ...props }) {
  return (
    <div
      className={`fixed z-50 grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg sm:rounded-lg ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children, className, ...props }) {
  return (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className, ...props }) {
  return (
    <h2 className={`text-lg font-semibold ${className || ''}`} {...props}>
      {children}
    </h2>
  );
}
