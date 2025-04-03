import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import * as TooltipPrimitive from '@rn-primitives/tooltip';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  TooltipPrimitive.ContentRef,
  TooltipPrimitive.ContentProps & { portalHost?: string }
>(({ className, portalHost, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal hostName={portalHost}>
    <TooltipPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
      <Animated.View
        entering={Platform.select({ default: FadeIn, web: undefined })}
        exiting={Platform.select({ default: FadeOut, web: undefined })}
      >
        <TextClassContext.Provider value="text-sm native:text-base text-popover-foreground">
          <TooltipPrimitive.Content
            ref={ref}
            className={cn(
              'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 shadow-md shadow-foreground/5 web:animate-in web:fade-in-0 web:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              className,
            )}
            sideOffset={sideOffset}
            {...props}
          />
        </TextClassContext.Provider>
      </Animated.View>
    </TooltipPrimitive.Overlay>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };
