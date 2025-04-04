import Icon, { IconProps } from '@/components/Icon';

export type NavIconProps = {
  name: IconProps['name'];
  focused: boolean;
};

export default function NavIcon({ name, focused }: NavIconProps) {
  return <Icon className={focused ? 'text-primary' : 'text-muted-foreground'} name={name} size={24} />;
}
