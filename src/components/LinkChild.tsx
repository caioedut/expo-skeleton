import { Children, cloneElement, type ReactElement } from 'react';
import { Platform, Pressable } from 'react-native';

import { jss } from '@react-bulk/core';
import { Link, LinkProps } from 'expo-router';

import { Falsy } from '@/types/util.type';

export type LinkChildProps = Pick<LinkProps, 'target'> & {
  children: ReactElement;
  href: Falsy<LinkProps['href']>;
};

export default function LinkChild({ children, href, target }: LinkChildProps) {
  if (!href) {
    return children;
  }

  const child = cloneElement(Children.only(children));

  return (
    <Link key={child.key} asChild withAnchor href={href} target={target}>
      <child.type
        component={Platform.OS === 'web' ? 'a' : Pressable}
        {...child.props}
        style={jss({ textDecoration: 'none' }, child.props.style)}
      />
    </Link>
  );
}
