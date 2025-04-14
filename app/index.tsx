import React from 'react';

import { jss } from '@react-bulk/core';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';

import LinkChild from '@/components/LinkChild';
import { Box, Button, Card, Loading, Text } from '@/components/ui';
import useAuth from '@/hooks/useAuth';

export default function Page() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading flex />;
  }

  if (status === 'authenticated') {
    return <Redirect href="/(private)/(nav)" />;
  }

  return (
    <Box center flex p={8}>
      <Card center corners={4} maxw={400} p={12} shadow={8} w="100%">
        <Image
          source={require('@/assets/images/rick.jpg')}
          style={jss({
            corners: 16,
            height: 80,
            width: 80,
          })}
        />
        <Text bold center mt={4} variant="title">
          Bem-vindo ao Nosso App!
        </Text>
        <Text center mt={2} variant="secondary">
          Uma jornada incrível começa aqui. Explore e aproveite o que temos a oferecer.
        </Text>
        <LinkChild href="/login">
          <Button mt={8}>Começar</Button>
        </LinkChild>
      </Card>
    </Box>
  );
}
