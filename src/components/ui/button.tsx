import * as React from 'react';
import { Pressable } from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-md px-8 native:h-14',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
      },
    },
  },
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: '',
        icon: '',
        lg: 'native:text-lg',
        sm: '',
      },
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
      },
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={cn(props.disabled && 'web:pointer-events-none', buttonTextVariants({ size, variant }))}
      >
        <Pressable
          ref={ref}
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ className, size, variant }),
          )}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
