import React from 'react';

export const Badge = ({ status = 'optimal', label, size = 'sm', pulse = false }) => {
  const statusStyles = {
    optimal: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    strained: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    critical: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    info: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  };

  const dotColors = {
    optimal: 'bg-emerald-500',
    strained: 'bg-amber-500',
    critical: 'bg-rose-600',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400'
  };

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${statusStyles[status] || statusStyles.neutral} ${sizeClasses[size]}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[status] || dotColors.neutral}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[status] || dotColors.neutral}`}
        />
      </span>
      <span>{label}</span>
    </span>
  );
};
