import React from 'react';
import { Plus, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * PageHeader - Consistent page header for all admin pages
 * Features: Title, description, breadcrumb, action buttons
 */

const PageHeader = ({
  title,
  description,
  showBackButton = false,
  backPath,
  actions,
  primaryAction,
  onRefresh,
  isRefreshing = false,
  badge,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mb-8">
      {/* Breadcrumb / Back */}
      {showBackButton && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-slate-500 text-sm lg:text-base">{description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="
                inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                border border-slate-200 bg-white text-slate-700
                hover:bg-slate-50 hover:border-slate-300
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm font-medium shadow-sm
              "
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}

          {/* Custom Actions */}
          {actions}

          {/* Primary Action */}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="
                inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                hover:from-blue-700 hover:to-indigo-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm font-medium shadow-lg shadow-blue-500/25
                hover:shadow-blue-500/40
              "
            >
              {primaryAction.icon || <Plus className="w-4 h-4" />}
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
