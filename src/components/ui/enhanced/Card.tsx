import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-200 bg-white shadow-sm',
          'hover:shadow-md hover:-translate-y-1',
        ],
        elevated: [
          'border-neutral-200 bg-white shadow-md',
          'hover:shadow-lg hover:-translate-y-1',
        ],
        glass: [
          'border-white/20 bg-white/80 backdrop-blur-md shadow-sm',
          'hover:bg-white/90 hover:shadow-md hover:-translate-y-1',
        ],
        outline: [
          'border-2 border-primary-200 bg-transparent',
          'hover:bg-primary-50 hover:border-primary-300',
        ],
        gradient: [
          'border-0 bg-gradient-to-br from-primary-50 to-primary-100/50 shadow-sm',
          'hover:from-primary-100 hover:to-primary-200/50 hover:shadow-md hover:-translate-y-1',
        ],
        health: [
          'border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-sm',
          'hover:from-primary-100 hover:to-primary-50 hover:shadow-md hover:-translate-y-1',
          'relative overflow-hidden',
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-500 before:to-primary-400',
        ],
        interactive: [
          'border-neutral-200 bg-white shadow-sm cursor-pointer',
          'hover:shadow-lg hover:-translate-y-2 hover:border-primary-300',
          'active:translate-y-0 active:shadow-md',
        ],
        success: [
          'border-green-200 bg-gradient-to-br from-green-50 to-white shadow-sm',
          'hover:from-green-100 hover:to-green-50 hover:shadow-md hover:-translate-y-1',
          'relative overflow-hidden',
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-green-500 before:to-green-400',
        ],
        warning: [
          'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white shadow-sm',
          'hover:from-yellow-100 hover:to-yellow-50 hover:shadow-md hover:-translate-y-1',
          'relative overflow-hidden',
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-yellow-500 before:to-yellow-400',
        ],
        danger: [
          'border-red-200 bg-gradient-to-br from-red-50 to-white shadow-sm',
          'hover:from-red-100 hover:to-red-50 hover:shadow-md hover:-translate-y-1',
          'relative overflow-hidden',
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-red-500 before:to-red-400',
        ],
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      rounded: {
        default: 'rounded-lg',
        sm: 'rounded-md',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        full: 'rounded-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, rounded, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { centerAlign?: boolean }
>(({ className, centerAlign, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 pb-4',
      centerAlign && 'text-center items-center',
      className
    )}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
>(({ className, as: Comp = 'h3', ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-neutral-900',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-600 leading-relaxed', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

// Health-specific card components
const HealthMetricCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    metric: string;
    value: string | number;
    unit?: string;
    trend?: 'up' | 'down' | 'stable';
    status?: 'excellent' | 'good' | 'fair' | 'poor';
  }
>(
  (
    {
      className,
      metric,
      value,
      unit,
      trend,
      status = 'good',
      children,
      ...props
    },
    ref
  ) => {
    const statusColors = {
      excellent: 'text-green-600 bg-green-50 border-green-200',
      good: 'text-primary-600 bg-primary-50 border-primary-200',
      fair: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      poor: 'text-red-600 bg-red-50 border-red-200',
    };

    const trendIcons = {
      up: '↗',
      down: '↘',
      stable: '→',
    };

    return (
      <Card
        ref={ref}
        variant="health"
        className={cn(statusColors[status], className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-600">{metric}</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-neutral-900">
                {value}
              </span>
              {unit && (
                <span className="text-sm text-neutral-500">{unit}</span>
              )}
            </div>
          </div>
          {trend && (
            <span className="text-lg" role="img" aria-label={`Trend ${trend}`}>
              {trendIcons[trend]}
            </span>
          )}
        </div>
        {children}
      </Card>
    );
  }
);

HealthMetricCard.displayName = 'HealthMetricCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  HealthMetricCard,
};