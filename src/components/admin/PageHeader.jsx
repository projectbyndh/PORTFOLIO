import React from 'react';
import { Plus, RefreshCw, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * PageHeader - Premium page header for all admin pages
 * Features: Title, description, breadcrumb, action buttons
 * Styled to match NDH Technologies design
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
          className="flex items-center gap-2 text-sm text-[#4A8EBC] hover:text-[#3B5488] mb-4 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      )}

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC] border border-[#4A8EBC]/20">
                <Sparkles className="w-3 h-3" />
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[#2B4066]/60 text-sm lg:text-base">{description}</p>
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
                border border-[#4A8EBC]/20 bg-white/80 backdrop-blur-sm text-[#4A8EBC]
                hover:bg-[#4A8EBC]/5 hover:border-[#4A8EBC]/30
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm font-semibold shadow-sm
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
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-[#4A8EBC] via-[#3B5488] to-[#2DD4BF] text-white
                hover:from-[#3B5488] hover:via-[#4A8EBC] hover:to-[#8B5CF6]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm font-semibold 
                shadow-lg shadow-[#4A8EBC]/25 hover:shadow-xl hover:shadow-[#4A8EBC]/30
                hover:scale-[1.02] active:scale-[0.98]
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
