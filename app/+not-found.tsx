import React from 'react';

import LinkChild from '@/components/LinkChild';
import ScreenOptions from '@/components/ScreenOptions';
import { Box, Button, Card, Text } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <ScreenOptions title="Oops!" />

      <Box center flex p={8}>
        <Card center corners={4} maxw={400} p={12} shadow={8} w="100%">
          <Text bold center mt={4} variant="title">
            Este link não existe!
          </Text>
          <LinkChild href="/">
            <Button mt={8}>Ir para página inicial</Button>
          </LinkChild>
        </Card>
      </Box>
    </>
  );
}
