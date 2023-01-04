import { Stack } from 'expo-router';
import ReactBulk from '@react-bulk/core';

import light from '../src/themes/light';
import useScreenOptions from '../src/hooks/useScreenOptions';

function Layout() {
  return <Stack screenOptions={useScreenOptions()} />;
}

export default () => (
  <ReactBulk theme={light}>
    <Layout />
  </ReactBulk>
);
