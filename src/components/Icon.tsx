import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { jss, type RbkColor, type RbkStyle, useTheme } from '@react-bulk/core';

export type IconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: RbkColor;
  size?: `${number}rem` | number;
  style?: RbkStyle;
};

/**
 * https://icons.expo.fyi/
 */
export default function Icon({ name, color = 'primary', size = '1rem', style }: IconProps) {
  const theme = useTheme();

  if (typeof size === 'string') {
    size = theme.rem(Number(size.replace('rem', '')));
  }

  return <MaterialCommunityIcons color={theme.color(color)} name={name} size={size} style={jss(style)} />;
}
