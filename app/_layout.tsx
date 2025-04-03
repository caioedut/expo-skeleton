import React from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { PortalHost } from '@rn-primitives/portal';
import { Slot } from 'expo-router';
import { SWRConfig } from 'swr';

import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

import '@/styles/global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
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
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
      <PortalHost />
    </SWRConfig>
  );
}
