import { jss, useTheme } from '@react-bulk/core';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import LinkChild from '@/components/LinkChild';
import NavIcon from '@/components/NavIcon';
import { Box } from '@/components/ui';
import useAuth from '@/hooks/useAuth';

export default function DrawerLayout(props: DrawerContentComponentProps) {
  const auth = useAuth();
  const theme = useTheme();

  async function handleLogout() {
    await auth.logout();
    router.replace('/');
  }

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <Box mb={4}>
        <LinkChild href="/(private)/(nav)">
          <Image
            contentFit="contain"
            source={require('@/assets/svgs/logo.svg')}
            style={jss({ h: 40, w: '100%' })}
            tintColor={theme.mode === 'dark' ? 'white' : 'black'}
          />
        </LinkChild>
      </Box>

      <DrawerItemList {...props} />

      <DrawerItem
        icon={({ color }) => <NavIcon color={color} name="logout" />}
        label="Sair"
        style={{ marginTop: 'auto' }}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
