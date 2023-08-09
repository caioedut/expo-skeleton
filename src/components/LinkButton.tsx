import { ButtonProps } from '@react-bulk/core';
import { Button } from '@react-bulk/native';
import { Link, LinkProps } from 'expo-router';

export type LinkButtonProps = {
  href: LinkProps<string>['href'];
} & ButtonProps;

export default function LinkButton({ href, ...rest }: LinkButtonProps) {
  return (
    <Link asChild href={href}>
      <Button {...rest} />
    </Link>
  );
}
