import type { BoxProps, LoadingProps, ReactElement } from '@react-bulk/core';

import { Image } from 'expo-image';

import Icon, { type IconProps } from '@/components/Icon';
import { Box, Button, Loading, Text } from '@/components/ui';

export type StateProps = BoxProps<false> & {
  children?: ReactElement;
  empty?: boolean | string;
  emptyIcon?: IconProps['name'];
  error?: any | string;
  errorIcon?: IconProps['name'];
  loading?: boolean | LoadingProps | string;
  onRefresh?: (...args: any[]) => any;
};

export default function State({
  children,
  empty,
  emptyIcon = 'folder-open-outline',
  error,
  errorIcon = 'emoticon-sad-outline',
  loading,
  onRefresh,
  ...rest
}: StateProps) {
  if (!loading && !error && !empty) {
    return children;
  }

  if (loading) {
    return (
      <Box center flex p="1gap" position="relative" {...rest}>
        <Loading
          label={typeof loading === 'string' ? loading : undefined}
          size={1.5}
          {...(typeof loading === 'object' ? loading : {})}
        />
      </Box>
    );
  }

  return (
    <Box center flex p="1gap" position="relative" {...rest}>
      <Box i={0} position="absolute" zIndex={1}>
        <Image
          contentFit="contain"
          source={require('@/assets/images/background/empty.png')}
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
      <Box center flex position="relative" zIndex={2}>
        {error ? (
          <>
            <Icon color="gray.light" name={errorIcon} size="6rem" />
            <Text bold center color="text.secondary" mt="1gap" variant="title">
              {typeof error === 'string' ? error : 'Houve um erro inesperado'}
            </Text>
            {typeof onRefresh === 'function' && (
              <Button mt="2gap" size="small" variant="outline" onPress={onRefresh}>
                Tentar Novamente
              </Button>
            )}
          </>
        ) : empty ? (
          <>
            <Icon color="gray.light" name={emptyIcon} size="6rem" />
            <Text bold center color="text.secondary" mt="1gap" variant="title">
              {typeof empty === 'string' ? empty : 'Nada por aqui...'}
            </Text>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
