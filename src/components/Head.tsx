import { useEffect } from 'react';

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';

import { string } from '@/helpers/string.helper';

export default function Head({ title, ...rest }: NativeStackNavigationOptions) {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: string(params?.title ?? title ?? ''),
      headerShown: true,
      ...rest,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.title, title, rest]);

  useFocusEffect(() => {
    setStatusBarStyle('light');
  });

  return <StatusBar style="light" />;
}
