import React from 'react';

/**
 * StatsCard - Display key metrics with icon and trend
 */
export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel,
  className = '' 
}) => {
  const isPositive = trend > 0;
  
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{trend}%
              </span>
              {trendLabel && (
                <span className="text-xs text-slate-400">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * DataCard - Generic card wrapper for content sections
 */
export const DataCard = ({ 
  title, 
  description,
  children, 
  actions,
  className = '',
  noPadding = false,
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            {title && <h3 className="font-semibold text-slate-900">{title}</h3>}
            {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </div>
  );
};

/**
 * EmptyState - Display when no data is available
 */
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="p-4 bg-slate-100 rounded-2xl mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
};

/**
 * StatusBadge - Consistent status indicators
 */
export const StatusBadge = ({ status, className = '' }) => {
  const statusStyles = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    published: 'bg-blue-100 text-blue-700 border-blue-200',
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    error: 'bg-red-100 text-red-700 border-red-200',
  };

  const style = statusStyles[status?.toLowerCase()] || statusStyles.inactive;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style} ${className}`}>
      {status}
    </span>
  );
};

/**
 * LoadingSpinner - Consistent loading indicator
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-slate-200 border-t-blue-600`} />
    </div>
  );
};

/**
 * PageLoader - Full page loading state
 */
export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-slate-500">Loading...</p>
    </div>
  );
};

/**
 * ErrorState - Display error messages with retry
 */
export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-4 bg-red-100 rounded-2xl mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">Something went wrong</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
