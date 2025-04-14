import React from 'react';

import { Redirect, Stack } from 'expo-router';

import { Loading } from '@/components/ui';
import useAuth from '@/hooks/useAuth';

export default function Layout() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading flex />;
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(nav)" options={{ headerShown: false }} />
    </Stack>
  );
}
