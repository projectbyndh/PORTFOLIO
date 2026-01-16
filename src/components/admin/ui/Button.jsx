import React from 'react';

/**
 * Button - Premium button styles for NDH admin panel
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-[1.02] active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-[#4A8EBC] via-[#3B5488] to-[#2DD4BF] text-white
      hover:from-[#3B5488] hover:via-[#4A8EBC] hover:to-[#8B5CF6]
      shadow-lg shadow-[#4A8EBC]/25 hover:shadow-xl hover:shadow-[#4A8EBC]/30
    `,
    secondary: `
      bg-white/80 backdrop-blur-sm text-[#4A8EBC] border border-[#4A8EBC]/20
      hover:bg-[#4A8EBC]/5 hover:border-[#4A8EBC]/30 shadow-sm
    `,
    ghost: `
      bg-transparent text-[#2B4066]/70
      hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-600 text-white
      hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25
    `,
    dangerOutline: `
      bg-white/80 backdrop-blur-sm text-red-600 border border-red-200
      hover:bg-red-50 hover:border-red-300
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-teal-600 text-white
      hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="animate-spin">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </button>
  );
};

/**
 * IconButton - Button with only icon
 */
export const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  tooltip,
  className = '',
  ...props
}) => {
  const variants = {
    ghost: 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
    primary: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
    danger: 'text-red-500 hover:text-red-700 hover:bg-red-50',
    success: 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50',
  };

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <button
      className={`
        rounded-lg transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      {icon}
    </button>
  );
};
