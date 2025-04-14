import React from 'react';
import { Platform } from 'react-native';

import { deepmerge, jss, useTheme } from '@react-bulk/core';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import InputKeyboard from '@/components/InputKeyboard';
import { AuthProvider } from '@/contexts/AuthContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function Layout() {
  const theme = useTheme();

  const NAV_THEME: typeof DarkTheme = deepmerge(theme.mode === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {
      background: theme.color('background.secondary'),
      // border: theme.color('background.disabled'),
      card: theme.color('background.primary'),
      notification: theme.color('secondary.main'),
      primary: theme.color('primary.main'),
      text: theme.contrast('background.primary'),
    },
  });

  useIsomorphicLayoutEffect(() => {
    if (Platform.OS === 'android') {
      void Promise.allSettled([
        NavigationBar.setButtonStyleAsync(theme.mode === 'dark' ? 'light' : 'dark'),
        NavigationBar.setBackgroundColorAsync(NAV_THEME.colors.background),
      ]);
    }
  }, [theme.mode]);

  return (
    <>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />

      <InputKeyboard
        offset={theme.spacing(theme.shape.gap)}
        style={jss({ bg: 'background.secondary', display: 'flex', h: '100%' })}
      >
        <ThemeProvider value={NAV_THEME}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </ThemeProvider>
      </InputKeyboard>
    </>
  );
}
