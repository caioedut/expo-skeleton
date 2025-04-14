import { RbkColor } from '@react-bulk/core';

import Icon, { IconProps } from '@/components/Icon';

export type NavIconProps = {
  name: IconProps['name'];
  color?: RbkColor;
};

export default function NavIcon({ name, color }: NavIconProps) {
  return <Icon color={color} name={name} size={24} />;
}
