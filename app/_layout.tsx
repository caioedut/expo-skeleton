import React, { useEffect } from 'react';
import { AppState, AppStateStatus, useColorScheme } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SWRConfig } from 'swr';

import Layout from '@/components/Layout';
import { ReactBulk } from '@/components/ui';
import useLocalStorage from '@/hooks/useLocalStorage';
import dark from '@/themes/dark';
import light from '@/themes/light';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const systemColorScheme = useColorScheme() || 'dark';

  const [themePreference, setThemePreference, isPendingThemePreference] = useLocalStorage<'dark' | 'light' | 'system'>(
    'themePreference',
  );

  const colorScheme = themePreference === 'system' ? systemColorScheme : themePreference;

  useEffect(() => {
    if (isPendingThemePreference) return;
    if (themePreference) return;
    setThemePreference('system');
  }, [themePreference, isPendingThemePreference]);

  if (isPendingThemePreference) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SWRConfig
        value={{
          provider: () => new Map(),
          initFocus(callback) {
            let appState = AppState.currentState;

            // Eventos do APP
            const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback();
              }

              appState = nextAppState;
            });

            return () => {
              subscription.remove();
            };
          },
          isVisible: () => {
            return true;
          },
        }}
      >
        <ReactBulk theme={colorScheme === 'dark' ? dark : light}>
          <Layout />
        </ReactBulk>
      </SWRConfig>
    </GestureHandlerRootView>
  );
}
