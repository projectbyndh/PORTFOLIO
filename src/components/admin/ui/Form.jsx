import React from 'react';

/**
 * Input - Consistent text input styling
 */
export const Input = React.forwardRef(({
  label,
  error,
  hint,
  required,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm
          border border-slate-200 bg-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          transition-all
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea - Consistent textarea styling
 */
export const Textarea = React.forwardRef(({
  label,
  error,
  hint,
  required,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm
          border border-slate-200 bg-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          transition-all resize-none
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select - Consistent select dropdown styling
 */
export const Select = React.forwardRef(({
  label,
  error,
  hint,
  required,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm
          border border-slate-200 bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          transition-all appearance-none cursor-pointer
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25rem 1.25rem',
          paddingRight: '2.5rem',
        }}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

/**
 * Checkbox - Consistent checkbox styling
 */
export const Checkbox = React.forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        className="
          w-5 h-5 rounded border-slate-300 text-blue-600
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
          cursor-pointer transition-colors
        "
        {...props}
      />
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

/**
 * FormGroup - Group form fields
 */
export const FormGroup = ({ children, className = '' }) => {
  return (
    <div className={`space-y-5 ${className}`}>
      {children}
    </div>
  );
};

/**
 * FormRow - Horizontal form layout
 */
export const FormRow = ({ children, cols = 2, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-5 ${className}`}>
      {children}
    </div>
  );
};
