import * as React from 'react';
import { Platform, View } from 'react-native';

import * as ProgressPrimitive from '@rn-primitives/progress';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  ProgressPrimitive.RootRef,
  ProgressPrimitive.RootProps & {
    indicatorClassName?: string;
  }
>(({ className, indicatorClassName, value, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <Indicator className={indicatorClassName} value={value} />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({ className, value }: { className?: string; value: null | number | undefined }) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`, {
        overshootClamping: true,
      }),
    };
  });

  if (Platform.OS === 'web') {
    return (
      <View
        className={cn('h-full w-full flex-1 bg-primary web:transition-all', className)}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      >
        <ProgressPrimitive.Indicator className={cn('h-full w-full ', className)} />
      </View>
    );
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View className={cn('h-full bg-foreground', className)} style={indicator} />
    </ProgressPrimitive.Indicator>
  );
}
