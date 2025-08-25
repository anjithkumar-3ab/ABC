import React from 'react';

export function Sheet({ children, open, onOpenChange }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      {children}
    </div>
  );
}

export function SheetContent({ children, className, ...props }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-md bg-white p-6 shadow-lg sm:max-w-md ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SheetHeader({ children, className, ...props }) {
  return (
    <div className={`flex flex-col space-y-2 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function SheetTitle({ children, className, ...props }) {
  return (
    <h2 className={`text-lg font-semibold ${className || ''}`} {...props}>
      {children}
    </h2>
  );
}

export function SheetTrigger({ children, asChild, ...props }) {
  return React.cloneElement(children, props);
}

export function SheetFooter({ children, className, ...props }) {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
