import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import Link from '@/components/Link';
import NavIcon from '@/components/NavIcon';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function DrawerLayout(props: DrawerContentComponentProps) {
  const auth = useAuth();
  const { colorScheme } = useTheme();

  async function handleLogout() {
    await auth.logout();
    router.replace('/');
  }

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <Link className="mb-6" href="/(private)/(nav)">
        <Image
          className="w-full h-10"
          contentFit="contain"
          source={require('@/assets/svgs/logo.svg')}
          tintColor={colorScheme == 'dark' ? 'white' : 'black'}
        />
      </Link>

      <DrawerItemList {...props} />

      <DrawerItem
        icon={({ focused }) => <NavIcon focused={focused} name="logout" />}
        label="Sair"
        style={{ marginTop: 'auto' }}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
