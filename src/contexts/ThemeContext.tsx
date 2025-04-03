import React, { createContext, type ReactElement, useState } from 'react';
import { Platform, useColorScheme as useColorSchemeRN } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider as NagivationThemeProvider, Theme } from '@react-navigation/native';
import { useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme as useColorSchemeNW } from 'nativewind';

import { NAV_THEME_DARK, NAV_THEME_LIGHT } from '@/constants/NavTheme';
import useLocalStorage from '@/hooks/useLocalStorage';

type ColorScheme = 'dark' | 'light';

type ThemePreference = 'dark' | 'light' | 'system';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME_LIGHT,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME_DARK,
};

export const ThemeContext = createContext<{
  colorScheme: ColorScheme;
  themePreference: ThemePreference;
  setThemePreference: (colorScheme: ThemePreference) => void;
}>(null as any);

export function ThemeProvider({ children }: { children?: ReactElement }) {
  const systemColorScheme = useColorSchemeRN() || 'dark';
  const { setColorScheme: setNwColorScheme } = useColorSchemeNW();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const [themePreference, _setThemePreference] = useLocalStorage<ThemePreference>('themePreference', 'system');

  const colorScheme = themePreference == 'system' ? systemColorScheme : themePreference;
  const navTheme = colorScheme == 'dark' ? DARK_THEME : LIGHT_THEME;

  useIsomorphicLayoutEffect(() => {
    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }

    if (Platform.OS === 'android') {
      void Promise.allSettled([
        NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
        NavigationBar.setBackgroundColorAsync(
          colorScheme === 'dark' ? NAV_THEME_DARK.background : NAV_THEME_LIGHT.background,
        ),
      ]);
    }

    setNwColorScheme(colorScheme);
    setIsColorSchemeLoaded(true);
  }, [colorScheme]);

  function setThemePreference(value: ThemePreference) {
    _setThemePreference(value);
    setNwColorScheme(value);
  }

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        themePreference,
        setThemePreference,
      }}
    >
      <NagivationThemeProvider value={navTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        {children}
      </NagivationThemeProvider>
    </ThemeContext.Provider>
  );
}
