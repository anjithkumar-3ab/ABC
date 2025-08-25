import React, { useState } from 'react';

export function Select({ children, value, onValueChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        return React.cloneElement(child, { 
          value, 
          onChange: onValueChange,
          isOpen,
          setIsOpen
        });
      })}
    </div>
  );
}

export function SelectTrigger({ children, className, isOpen, setIsOpen, ...props }) {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent px-3 py-2 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, isOpen, ...props }) {
  if (!isOpen) return null;
  
  return (
    <div
      className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md"
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ children, value, onChange, className, ...props }) {
  return (
    <div
      onClick={() => onChange && onChange(value)}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-slate-100 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
