import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

type Props = NativeStackNavigationOptions;

export default function ScreenOptions(props: Props) {
  return <Stack.Screen options={{ headerShown: true, ...props }} />;
}
