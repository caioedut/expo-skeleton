import { useTheme } from '@react-bulk/core';

export default function useScreenOptions() {
  const theme = useTheme();

  return {
    title: '',

    contentStyle: {
      backgroundColor: theme.color('background.secondary'),
    },

    headerShow: true,

    headerStyle: {
      backgroundColor: theme.color('primary.main'),
    },

    headerTintColor: theme.color('white'),
  };
}
