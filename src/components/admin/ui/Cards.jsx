import React from 'react';

/**
 * StatsCard - Display key metrics with icon and trend
 * Styled to match NDH Technologies design
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
    <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#4A8EBC]/10 hover:shadow-xl hover:border-[#4A8EBC]/20 transition-all duration-300 overflow-hidden group ${className}`}>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4A8EBC]/5 to-[#2DD4BF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#2B4066]/60 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent tracking-tight">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                isPositive 
                  ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 border border-emerald-500/20' 
                  : 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 border border-red-500/20'
              }`}>
                {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              {trendLabel && (
                <span className="text-xs text-[#2B4066]/50">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-gradient-to-br from-[#4A8EBC] to-[#2DD4BF] rounded-xl shadow-lg shadow-[#4A8EBC]/20 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
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
    <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-[#4A8EBC]/10 overflow-hidden ${className}`}>
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A8EBC] via-[#2DD4BF] to-[#8B5CF6]" />
      
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#4A8EBC]/10 bg-gradient-to-r from-[#4A8EBC]/5 to-[#2DD4BF]/5">
          <div>
            {title && <h3 className="font-bold text-[#1A2A44]">{title}</h3>}
            {description && <p className="text-sm text-[#2B4066]/60 mt-0.5">{description}</p>}
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
        <div className="p-4 bg-gradient-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/10 rounded-2xl mb-4 border border-[#4A8EBC]/10">
          <Icon className="w-8 h-8 text-[#4A8EBC]" />
        </div>
      )}
      <h3 className="text-lg font-bold text-[#1A2A44] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#2B4066]/60 max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
};

/**
 * StatusBadge - Consistent status indicators with NDH styling
 */
export const StatusBadge = ({ status, className = '' }) => {
  const statusStyles = {
    active: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-500/20',
    inactive: 'bg-gradient-to-r from-slate-500/10 to-gray-500/10 text-slate-600 border-slate-500/20',
    pending: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-500/20',
    published: 'bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC] border-[#4A8EBC]/20',
    draft: 'bg-gradient-to-r from-slate-500/10 to-gray-500/10 text-slate-600 border-slate-500/20',
    error: 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-700 border-red-500/20',
  };

  const style = statusStyles[status?.toLowerCase()] || statusStyles.inactive;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${style} ${className}`}>
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
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-[#4A8EBC]/20 border-t-[#4A8EBC]`} />
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
      <p className="mt-4 text-sm text-[#2B4066]/60">Loading...</p>
    </div>
  );
};

/**
 * ErrorState - Display error messages with retry
 */
export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl mb-4 border border-red-500/20">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Something went wrong</h3>
      <p className="text-sm text-[#2B4066]/60 max-w-sm mb-4">{message}</p>
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
