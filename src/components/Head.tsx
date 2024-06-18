import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useEffect, useMemo } from 'react';
import { Platform, Pressable } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-bulk/core';
import { Box, Text } from '@react-bulk/native';
import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { router, useFocusEffect, useLocalSearchParams, useNavigation, usePathname } from 'expo-router';
import { StatusBar, type StatusBarStyle, setStatusBarStyle } from 'expo-status-bar';

import { string } from '@/helpers/string.helper';

export default function Head({ title, ...rest }: NativeStackNavigationOptions) {
  const params = useLocalSearchParams();
  const pathname = usePathname();
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = useNavigationTheme();

  const pageTitle = useMemo(() => string(params?.title ?? title), [params?.title, title]);
  const contrastColor = useMemo(() => theme.contrast(colors.card), [theme, colors]);
  const statusBarStyle = useMemo(() => theme.contrast(colors.card, 'light', 'dark') as StatusBarStyle, [theme, colors]);

  useEffect(() => {
    const options: NativeStackNavigationOptions = {
      title: pageTitle,
      headerBackTitle: 'Voltar',
      headerShown: true,
      headerTintColor: contrastColor,
      ...rest,
    };

    // em alguns casos, se faz necessario inserir o botao
    // voltar manual porque o router nao consegue identificar
    // o historico quando uma tela e acessada diretamente pelo link
    if (pathname !== '/' && !options.headerLeft && !navigation.canGoBack()) {
      const backURL = pathname.split('/').at(-2) || '/';

      options.headerLeft = ({ label, tintColor }) => (
        <Pressable
          style={{
            marginHorizontal: Platform.OS === 'ios' ? 7 : 14,
            paddingVertical: 4,
          }}
          onPress={() => router.replace(backURL)}
        >
          <Box center noWrap row>
            <MaterialIcons
              color={tintColor}
              name={Platform.OS === 'ios' ? 'arrow-back-ios-new' : 'arrow-back'}
              size={24}
            />

            {Boolean(label) && Platform.OS === 'ios' && (
              <Text color={tintColor} fontSize={20} marginLeft={4}>
                {label}
              </Text>
            )}
          </Box>
        </Pressable>
      );
    }

    navigation.setOptions(options);
  }, [pathname, navigation, pageTitle, contrastColor, rest]);

  useFocusEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = pageTitle || 'Home';
    }

    setStatusBarStyle(statusBarStyle);
  });

  return <StatusBar style={statusBarStyle} />;
}
