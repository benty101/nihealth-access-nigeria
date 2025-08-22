import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
          'hover:from-primary-600 hover:to-primary-700 hover:shadow-md hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-sm',
          'shadow-sm border-0',
        ],
        destructive: [
          'bg-gradient-to-r from-red-500 to-red-600 text-white',
          'hover:from-red-600 hover:to-red-700 hover:shadow-md hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-sm',
          'shadow-sm border-0',
        ],
        outline: [
          'border-2 border-primary-300 bg-transparent text-primary-700',
          'hover:bg-primary-50 hover:border-primary-400 hover:shadow-sm',
          'active:bg-primary-100',
        ],
        secondary: [
          'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-900 border border-neutral-300',
          'hover:from-neutral-200 hover:to-neutral-300 hover:shadow-sm hover:-translate-y-0.5',
          'active:translate-y-0',
        ],
        ghost: [
          'text-neutral-700 bg-transparent',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'active:bg-neutral-200',
        ],
        link: [
          'text-primary-600 underline-offset-4',
          'hover:underline hover:text-primary-700',
          'active:text-primary-800',
        ],
        success: [
          'bg-gradient-to-r from-green-500 to-green-600 text-white',
          'hover:from-green-600 hover:to-green-700 hover:shadow-md hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-sm',
          'shadow-sm border-0',
        ],
        warning: [
          'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
          'hover:from-yellow-600 hover:to-yellow-700 hover:shadow-md hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-sm',
          'shadow-sm border-0',
        ],
        glass: [
          'bg-white/80 backdrop-blur-md border border-white/20 text-neutral-900',
          'hover:bg-white/90 hover:shadow-md hover:-translate-y-0.5',
          'active:translate-y-0',
        ],
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 py-1.5 text-xs',
        lg: 'h-12 px-6 py-3 text-base',
        xl: 'h-14 px-8 py-4 text-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      rounded: {
        default: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };