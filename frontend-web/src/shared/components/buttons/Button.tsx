interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#7B2D8B] text-white hover:bg-[#6B1D7B]',
    secondary: 'border-2 border-[#7B2D8B] text-[#7B2D8B] hover:bg-[#7B2D8B] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'hover:bg-secondary text-foreground',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`rounded-lg transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
