import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map(n => {
        const icons = {
          success: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
          critical: <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        };

        const bg = {
          success: 'bg-white border-emerald-200 shadow-elevated',
          critical: 'bg-rose-50 border-rose-200 shadow-elevated text-rose-900',
          warning: 'bg-amber-50 border-amber-200 shadow-elevated text-amber-900',
          info: 'bg-white border-teal-200 shadow-elevated'
        };

        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-all duration-200 ${bg[n.type] || bg.info}`}
          >
            {icons[n.type] || icons.info}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900">{n.title}</div>
              <div className="text-slate-600 text-[11px] mt-0.5">{n.message}</div>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
