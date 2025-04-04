import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

import colors from 'tailwindcss/colors';

export type LoadingProps = ActivityIndicatorProps;

export default function Loading(props: LoadingProps) {
  return (
    <View className="flex-1 flex items-center justify-center">
      <ActivityIndicator color={colors.gray['500']} {...props} />
    </View>
  );
}
