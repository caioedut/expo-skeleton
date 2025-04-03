import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { cssInterop } from 'nativewind';

import { cn } from '@/lib/utils';

export type IconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  className?: string;
  color?: string;
  size?: number;
};

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
});

/**
 * https://icons.expo.fyi/
 */
export default function Icon({ name, className, color, size = 18 }: IconProps) {
  return <MaterialCommunityIcons className={cn('text-primary', className)} color={color} name={name} size={size} />;
}
