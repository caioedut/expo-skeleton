import { useEffect } from 'react';

import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export type HeaderProps = {
  title?: string;
};

export default function Head({ title }: HeaderProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return <StatusBar style="light" />;
}
