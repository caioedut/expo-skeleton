import { Pressable, View } from 'react-native';

import { router } from 'expo-router';

import Icon from '@/components/Icon';
import Link from '@/components/Link';
import ScreenOptions from '@/components/ScreenOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  type Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { Large, Muted } from '@/components/ui/typography';
import { match } from '@/helpers/util.helper';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Page() {
  const auth = useAuth();
  const { themePreference, setThemePreference } = useTheme();

  async function handleChangeTheme(option: Option) {
    // @ts-expect-error
    setThemePreference(option.value ?? 'system');
  }

  async function handleLogout() {
    await auth.logout();
    router.replace('/');
  }

  return (
    <>
      <ScreenOptions title="Ajustes" />

      <View className="flex-1 p-6 gap-8">
        <Link href="/profile">
          <Card className="rounded-full overflow-hidden">
            <View className="flex flex-row items-center gap-4 p-2">
              <Avatar className="w-16 h-16" alt="Avatar">
                <AvatarImage source={require('@/assets/images/rick.jpg')} />
                <AvatarFallback>
                  <Text>RS</Text>
                </AvatarFallback>
              </Avatar>
              <View className="flex-1">
                <Large>{auth?.user?.name}</Large>
                <Muted>{auth?.user?.email}</Muted>
              </View>
              <View className="mr-2">
                <Icon name="chevron-right" />
              </View>
            </View>
          </Card>
        </Link>

        <Card className="rounded-full overflow-hidden">
          <View className="flex flex-row items-center gap-4 p-2 min-h-[56]">
            <View className="bg-primary rounded-full mx-2 p-1">
              <Icon className="text-white" name="theme-light-dark" />
            </View>

            <Text className="flex-1">Tema</Text>

            <Select
              defaultValue={{
                label: match(themePreference, {
                  dark: 'Escuro',
                  default: 'Desconhecido',
                  light: 'Claro',
                  system: 'Sistema',
                }),
                value: themePreference,
              }}
              onValueChange={handleChangeTheme}
            >
              <SelectTrigger className="w-[120px] rounded-full">
                <SelectValue className="text-foreground text-sm native:text-lg" placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="w-[120px]">
                <SelectGroup>
                  <SelectItem label="Claro" value="light" />
                  <SelectItem label="Escuro" value="dark" />
                  <SelectItem label="Sistema" value="system" />
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
        </Card>

        <Pressable className="mt-auto" onPress={handleLogout}>
          <Card className="rounded-full overflow-hidden">
            <View className="flex flex-row items-center gap-4 p-2 min-h-[56]">
              <View className="bg-red-500 rounded-full mx-2 p-1">
                <Icon className="text-white" name="logout" />
              </View>

              <Text className="flex-1">Sair</Text>
            </View>
          </Card>
        </Pressable>
      </View>
    </>
  );
}
