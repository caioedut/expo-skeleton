import { RbkColor, RbkStyle, jss, useTheme } from '@react-bulk/core';

export type IconProps = {
  color?: RbkColor;
  mirrored?: boolean;
  name: keyof typeof icons;
  size?: number | string;
  style?: RbkStyle;
  weight?: 'bold' | 'duotone' | 'fill' | 'light' | 'regular' | 'thin';
};

/**
 * https://phosphoricons.com/
 */
export default function Icon({
  name,
  color = 'primary',
  mirrored,
  size = '1rem',
  style,
  weight = 'regular',
}: IconProps) {
  const theme = useTheme();

  if (typeof size === 'string' && size.endsWith('rem')) {
    size = theme.rem(Number(size.replace('rem', '')));
  }

  const Component = icons[name];

  return <Component color={theme.color(color)} mirrored={mirrored} size={size} style={jss(style)} weight={weight} />;
}

/* eslint-disable @typescript-eslint/no-var-requires */
const icons = {
  House: require('phosphor-react-native/src/icons/House').default,
};
