import { Stack } from 'expo-router';
import ReactBulk from '@react-bulk/core';

import light from '../src/themes/light';
import useScreenOptions from '../src/hooks/useScreenOptions';

export default function Layout() {
  return (
    <ReactBulk theme={light}>
      <Stack screenOptions={useScreenOptions()} />
    </ReactBulk>
  );
}
