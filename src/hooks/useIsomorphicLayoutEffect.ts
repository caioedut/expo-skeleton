import { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';
import { Platform } from 'react-native';

export default function useIsomorphicLayoutEffect(effect: EffectCallback, dependencies: DependencyList) {
  if (Platform.OS === 'web' && typeof window === 'undefined') {
    useEffect(effect, dependencies);
  } else {
    useLayoutEffect(effect, dependencies);
  }
}
