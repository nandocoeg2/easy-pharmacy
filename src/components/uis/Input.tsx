import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

export default function Input({
  leftIcon,
  rightIcon,
  error,
  className = "",
  ...props
}: InputProps) {
  const baseStyles =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500";
  const iconStyles = `${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}`;
  const errorStyles = error ? "border-red-300" : "";

  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {leftIcon}
        </div>
      )}
      <input
        className={`${baseStyles} ${iconStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {rightIcon}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
