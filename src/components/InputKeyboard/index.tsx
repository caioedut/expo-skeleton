import RNInputKeyboard, { InputKeyboardProps } from 'react-native-input-keyboard';

export default function InputKeyboard({ style, ...rest }: InputKeyboardProps) {
  style = [{ flex: 1 }, ...(!style ? [] : Array.isArray(style) ? style : [style])];

  return <RNInputKeyboard {...rest} style={style} />;
}
