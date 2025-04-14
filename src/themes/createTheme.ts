import { Platform } from 'react-native';

import { deepmerge, type ThemeEditProps } from '@react-bulk/core';

export default function createTheme(theme: ThemeEditProps): ThemeEditProps {
  const base: ThemeEditProps = {
    colors: {
      // primary: '#00CDB6',
      // secondary: '#005BAA',
    },
    components: {
      Card: {
        defaultProps: {
          shadow: 2,
        },
      },
      Toaster: {
        defaultProps: Platform.OS === 'web' ? {} : { width: '100%' },
      },
    },
  };

  return deepmerge(base, theme);
}
