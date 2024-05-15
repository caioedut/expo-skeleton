import InputKeyboard from 'react-native-input-keyboard';

import { useTheme } from '@react-bulk/core';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function Layout() {
  const theme = useTheme();

  return (
    <InputKeyboard>
      <ThemeProvider
        value={{
          colors: {
            background: theme.color('background.secondary'),
            border: theme.color('background.disabled'),
            card: theme.color('background.primary'),
            notification: theme.color('secondary.main'),
            primary: theme.color('primary.main'),
            text: theme.contrast('background.primary'),
          },
          dark: theme.mode === 'dark',
        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </InputKeyboard>
  );
}
