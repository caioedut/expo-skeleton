import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Redirect, Stack } from 'expo-router';

import useAuth from '@/hooks/useAuth';

export default function Layout() {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator color="#6b7280" size="large" />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
