import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

export type ScreenOptionsProps = NativeStackNavigationOptions;

export default function ScreenOptions(props: ScreenOptionsProps) {
  return (
    <Stack.Screen
      options={{
        headerBackTitle: 'Voltar',
        headerShown: true,
        ...props,
      }}
    />
  );
}
