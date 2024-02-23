import { RbkColor, RbkStyle, jss, useTheme } from '@react-bulk/core';

import { number } from '@/helpers/number.helper';

export type IconProps = {
  color?: RbkColor;
  fill?: RbkColor | boolean;
  name: keyof typeof icons;
  size?: number | string;
  style?: RbkStyle;
  weight?: 'bold' | 'bolder' | 'light' | 'lighter' | 'regular';
};

/**
 * https://lucide.dev/
 */
export default function Icon({ name, color, fill, size, style, weight }: IconProps) {
  const theme = useTheme();

  color = theme.color(color ?? 'primary');

  if (typeof size === 'string' && size.endsWith('rem')) {
    size = theme.rem(number(size.replace('rem', '')));
  }

  if (typeof fill === 'boolean') {
    fill = fill ? color : undefined;
  }

  const strokeWidth = {
    bold: 2,
    bolder: 3,
    light: 1,
    lighter: 0.5,
    regular: 1.75,
  }[weight ?? 'regular'];

  const Component = icons[name];

  return (
    <Component //
      color={color}
      fill={fill}
      size={size ?? theme.rem()}
      strokeWidth={strokeWidth ?? 2}
      style={jss(style)}
    />
  );
}

/* eslint-disable @typescript-eslint/no-var-requires */
const icons = {
  Home: require('lucide-react-native/dist/cjs/icons/home'),
};
