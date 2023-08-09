import { Stack } from 'expo-router';

import useScreenOptions from '@/hooks/useScreenOptions';

export default function Layout() {
  return <Stack screenOptions={useScreenOptions()} />;
}
