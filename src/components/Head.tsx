import { useEffect, useMemo } from 'react';

import { useTheme as useNavigationTheme } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar, type StatusBarStyle, setStatusBarStyle } from 'expo-status-bar';

import { string } from '@/helpers/string.helper';
import { useTheme } from '@react-bulk/core';

export default function Head({ title, ...rest }: NativeStackNavigationOptions) {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = useNavigationTheme();

  const contrastColor = useMemo(() => theme.contrast(colors.card), [theme, colors]);
  const statusBarStyle = useMemo(() => theme.contrast(colors.card, 'light', 'dark') as StatusBarStyle, [theme, colors]);

  useEffect(() => {
    navigation.setOptions({
      title: string(params?.title ?? title ?? ''),
      headerTintColor: contrastColor,
      headerShown: true,
      ...rest,
    } as NativeStackNavigationOptions);
  }, [navigation, params?.title, title, contrastColor, rest]);

  useFocusEffect(() => {
    setStatusBarStyle(statusBarStyle);
  });

  return <StatusBar style={statusBarStyle} />;
}
