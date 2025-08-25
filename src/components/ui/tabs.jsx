import React, { useState } from 'react';

export function Tabs({ children, value, onValueChange, className, ...props }) {
  return (
    <div className={`${className || ''}`} {...props}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { value, onValueChange });
      })}
    </div>
  );
}

export function TabsList({ children, className, value, onValueChange, ...props }) {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 ${className || ''}`}
      {...props}
    >
      {React.Children.map(children, child => {
        return React.cloneElement(child, { 
          isSelected: child.props.value === value,
          onClick: () => onValueChange(child.props.value)
        });
      })}
    </div>
  );
}

export function TabsTrigger({ children, className, value, isSelected, onClick, ...props }) {
  const selectedClass = isSelected ? 'bg-white text-slate-900 shadow-sm' : '';
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${selectedClass} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className, ...props }) {
  return (
    <div
      className={`mt-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
