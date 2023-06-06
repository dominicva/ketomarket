import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

const buttonClasses = cva(
  [
    'rounded-full',
    'font-medium',
    'hover:translate-y-0.5',
    'active:translate-y-0.5',
    'hover:opacity-90',
    'transition',
    'duration-200',
    'ease-in-out',
    'shadow-sm',
    'hover:shadow-md',
  ],
  {
    variants: {
      intent: {
        primary: ['bg-secondary', 'text-white', 'border-transparent'],
        secondary: ['bg-tertiary', 'text-white', 'border-gray-200'],
        tertiary: ['text-secondary', 'border-secondary', 'border-2'],
        text: ['bg-transparent', 'text-off-black', 'hover:bg-gray-100'],
      },
      size: {
        small: ['text-md', 'px-3', 'py-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};

// export default Button;
