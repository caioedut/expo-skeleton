import { useTheme } from '@react-bulk/core';

export default function useScreenOptions() {
  const theme = useTheme();

  return {
    headerStyle: { backgroundColor: theme.color('primary.main') },
    headerTintColor: theme.contrast('primary.dark'),
    contentStyle: { backgroundColor: theme.color('background.secondary') },
  };
}
