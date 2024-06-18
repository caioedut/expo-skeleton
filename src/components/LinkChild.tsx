import { Children, ComponentProps, type ReactElement, cloneElement } from 'react';
import { Platform, Pressable } from 'react-native';

import { Link } from 'expo-router';

import { Falsy } from '@/types/util.type';

type LinkProps = ComponentProps<typeof Link>;

export type LinkChildProps = {
  children: ReactElement;
  href: Falsy<LinkProps['href']>;
} & Pick<LinkProps, 'target'>;

export default function LinkChild({ children, href, target }: LinkChildProps) {
  if (!href) {
    return children;
  }

  const child = cloneElement(Children.only(children));

  return (
    <Link key={child.key} asChild href={href} target={target}>
      <child.type component={Platform.OS === 'web' ? 'a' : Pressable} {...child.props} />
    </Link>
  );
}
