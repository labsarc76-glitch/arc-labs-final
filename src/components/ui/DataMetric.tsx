import React from 'react';
import { DataMetricValue } from '../../types';
import { DataLabelBadge } from './Badge';

interface DataMetricProps {
  metric: DataMetricValue;
  compact?: boolean;
  className?: string;
  id?: string;
}

export const DataMetric: React.FC<DataMetricProps> = ({
  metric,
  compact = false,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {metric.label}
        </span>
        <DataLabelBadge type={metric.type} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {metric.unit}
          </span>
        )}
      </div>
      {!compact && metric.description && (
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-2">
          {metric.description}
        </p>
      )}
    </div>
  );
};
