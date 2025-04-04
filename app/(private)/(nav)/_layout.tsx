import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { useWindowDimensions } from 'react-native';

import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import DrawerLayout from '@/components/DrawerLayout';
import { IconProps } from '@/components/Icon';
import NavIcon from '@/components/NavIcon';
import colors from '@/styles/colors';

const screens: {
  name: string;
  title: string;
  drawerOptions?: DrawerNavigationOptions;
  icon: IconProps['name'];
  tabOptions?: BottomTabNavigationOptions;
}[] = [
  {
    name: 'index',
    title: 'Início',
    icon: 'home',
  },
  {
    name: '(settings)',
    title: 'Ajustes',
    icon: 'cog',
  },
];

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <>
      {width > 1024 ? (
        <Drawer
          drawerContent={(props) => <DrawerLayout {...props} />}
          screenOptions={{ drawerActiveTintColor: colors.primary.DEFAULT, headerShown: false }}
        >
          {screens.map(({ name, title, drawerOptions, icon }) => (
            <Drawer.Screen
              key={name}
              name={name}
              options={{
                title,
                drawerIcon: ({ focused }) => <NavIcon focused={focused} name={icon} />,
                drawerType: 'permanent',
                headerLeft: () => null,
                ...drawerOptions,
              }}
            />
          ))}
        </Drawer>
      ) : (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary.DEFAULT }}>
          {screens.map(({ name, title, icon, tabOptions }) => (
            <Tabs.Screen
              key={name}
              name={name}
              options={{
                title,
                tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={icon} />,
                ...tabOptions,
              }}
            />
          ))}
        </Tabs>
      )}
    </>
  );
}
