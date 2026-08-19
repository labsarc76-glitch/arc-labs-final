import React from 'react';
import { DataLabelType } from '../../types';
import { DATA_LABEL_STYLES } from '../../lib/constants';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'purple' | 'cyan';
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  id,
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80',
    outline: 'bg-transparent text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20',
  }[variant];

  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center font-medium rounded-full tracking-wide transition-colors whitespace-nowrap ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

interface DataLabelBadgeProps {
  type: DataLabelType;
  showTooltip?: boolean;
  className?: string;
  id?: string;
}

export const DataLabelBadge: React.FC<DataLabelBadgeProps> = ({
  type,
  showTooltip = true,
  className = '',
  id,
}) => {
  const style = DATA_LABEL_STYLES[type] || DATA_LABEL_STYLES.MEASURED;

  return (
    <span
      id={id}
      title={showTooltip ? style.desc : undefined}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 animate-pulse" />
      {type}
    </span>
  );
};
