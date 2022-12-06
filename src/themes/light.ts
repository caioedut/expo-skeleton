import { ThemeOptionalProps } from '@react-bulk/core';

const light: ThemeOptionalProps = {
  mode: 'light',

  colors: {
    primary: '#2962ff',
    secondary: '#aa00ff',
  } as any,

  components: {
    Card: {
      defaultProps: {
        corners: 2,
      },
    } as any,
  } as any,
};

export default light;
