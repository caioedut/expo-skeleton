import { useEffect } from 'react';

import { useTheme } from '@react-bulk/core';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar, StatusBarStyle, setStatusBarStyle } from 'expo-status-bar';

import { string } from '@/helpers/string.helper';

export default function Head({ title, headerShown = true, ...rest }: NativeStackNavigationOptions) {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const statusBarStyle = theme.contrast('primary', 'light', 'dark') as StatusBarStyle;

  useEffect(() => {
    const options: NativeStackNavigationOptions = {
      title: string(params?.title ?? title),
      headerShown,
      headerStyle: {
        backgroundColor: theme.color('primary'),
      },
      headerTintColor: theme.contrast('primary'),
      ...rest,
    };

    navigation.setOptions(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.title, title, headerShown, rest]);

  useFocusEffect(() => {
    setStatusBarStyle(statusBarStyle);
  });

  return <StatusBar style={statusBarStyle} />;
}
