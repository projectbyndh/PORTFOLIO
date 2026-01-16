import React from 'react';

/**
 * Button - Consistent button styles across admin panel
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
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-indigo-600 text-white
      hover:from-blue-700 hover:to-indigo-700
      shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
    `,
    secondary: `
      bg-white text-slate-700 border border-slate-200
      hover:bg-slate-50 hover:border-slate-300 shadow-sm
    `,
    ghost: `
      bg-transparent text-slate-600
      hover:bg-slate-100 hover:text-slate-900
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700 shadow-lg shadow-red-500/25
    `,
    dangerOutline: `
      bg-white text-red-600 border border-red-200
      hover:bg-red-50 hover:border-red-300
    `,
    success: `
      bg-emerald-600 text-white
      hover:bg-emerald-700 shadow-lg shadow-emerald-500/25
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
