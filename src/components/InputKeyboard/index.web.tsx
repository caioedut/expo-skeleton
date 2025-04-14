import { Pressable, View, ViewProps } from 'react-native';

type InputKeyboardProps = Omit<ViewProps, 'onResponderGrant' | 'onStartShouldSetResponder'> & {
  enabled?: never;
  offset?: never;
  onPress?: never;
};

export default function InputKeyboard({ onPress, ...rest }: InputKeyboardProps) {
  delete rest.enabled;
  delete rest.offset;

  const Component = onPress ? Pressable : View;

  return <Component {...rest} />;
}
