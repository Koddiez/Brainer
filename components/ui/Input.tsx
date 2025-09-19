import React from 'react';

// FIX: Use Omit to avoid conflict with the native onChange event handler.
// This resolves the type error on `onChange` and a subsequent inference error on `className`.
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  // FIX: Made the icon prop type more specific to ensure it can receive a className prop, resolving the cloneElement error.
  icon?: React.ReactElement<{ className?: string }>;
}

const Input: React.FC<InputProps> = ({ id, label, value, onChange, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
              {React.cloneElement(icon, { className: 'h-5 w-5' })}
            </span>
          </div>
        )}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;