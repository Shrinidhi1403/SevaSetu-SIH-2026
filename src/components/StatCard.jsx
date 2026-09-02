import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral', // 'positive' | 'negative' | 'neutral'
  variant = 'default', // 'default' | 'teal' | 'amber' | 'rose' | 'blue'
  className = ""
}) => {
  const variantBg = {
    default: 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800',
    teal: 'bg-teal-50/40 dark:bg-teal-950/30 border-teal-200/80 dark:border-teal-800/60',
    amber: 'bg-amber-50/40 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-800/60',
    rose: 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/60',
    blue: 'bg-blue-50/40 dark:bg-blue-950/30 border-blue-200/80 dark:border-blue-800/60',
  };

  const iconColors = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    teal: 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300',
    amber: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
    rose: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300',
    blue: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300',
  };

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 shadow-sm transition-all duration-150 hover:shadow-md ${variantBg[variant] || variantBg.default} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trendType === 'positive'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : trendType === 'negative'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${iconColors[variant] || iconColors.default}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
