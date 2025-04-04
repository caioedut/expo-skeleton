import { Tabs } from 'expo-router';

import Icon from '@/components/Icon';
import colors from '@/styles/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary.DEFAULT }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <Icon className={focused ? 'text-primary' : 'text-muted-foreground'} name="home" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ focused }) => (
            <Icon className={focused ? 'text-primary' : 'text-muted-foreground'} name="cog" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
