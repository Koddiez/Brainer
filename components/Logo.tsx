import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        {/* Abstract logo combining a brain/lightbulb and a person icon. */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3C9.92487 3 5 7.92487 5 14C5 18.0691 7.14953 21.6146 10.3691 23.6357C9.83362 22.535 9.5 21.3148 9.5 20C9.5 16.4101 12.4101 13.5 16 13.5C19.5899 13.5 22.5 16.4101 22.5 20C22.5 21.3148 22.1664 22.535 21.6309 23.6357C24.8505 21.6146 27 18.0691 27 14C27 7.92487 22.0751 3 16 3ZM16 29C13.2386 29 11 26.7614 11 24C11 21.2386 13.2386 19 16 19C18.7614 19 21 21.2386 21 24C21 26.7614 18.7614 29 16 29Z"
          fill="url(#logo-gradient)"
        />
      </svg>
      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Brainer
      </span>
    </div>
  );
};

export default Logo;
