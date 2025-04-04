import { Pressable } from 'react-native';

import { Link as ExpoLink, type LinkProps as ExpoLinkProps } from 'expo-router';

export type LinkProps = Pick<ExpoLinkProps, 'asChild' | 'children' | 'className' | 'href' | 'target'>;

export default function Link({ asChild, children, className, href, target }: LinkProps) {
  return (
    <ExpoLink className={className} asChild withAnchor href={href} target={target}>
      {asChild ? children : <Pressable>{children}</Pressable>}
    </ExpoLink>
  );
}
