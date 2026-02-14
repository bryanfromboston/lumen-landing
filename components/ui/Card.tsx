import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature' | 'pricing' | 'security';
  elevated?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', elevated = true, children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-xl transition-all duration-300';

    const variants = {
      default: 'p-6',
      feature: 'p-8 text-center',
      pricing: 'p-8 flex flex-col',
      security: 'p-6 flex flex-col md:flex-row items-start md:items-center gap-4',
    };

    const shadowStyles = elevated
      ? 'shadow-lg hover:shadow-xl'
      : 'shadow-sm hover:shadow-md';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          shadowStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
