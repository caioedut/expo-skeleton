import { Children, ReactElement } from 'react';

import { Link } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';

export type LinkChildProps = {
  children: ReactElement;
  href: ExpoRouter.Href;
};

export default function LinkChild({ children, href }: LinkChildProps) {
  return href ? (
    <Link asChild href={href}>
      {Children.only(children)}
    </Link>
  ) : (
    children
  );
}
