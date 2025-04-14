import { InputValue, RbkInputEvent } from '@react-bulk/core';
import { router } from 'expo-router';

import Icon from '@/components/Icon';
import LinkChild from '@/components/LinkChild';
import ScreenOptions from '@/components/ScreenOptions';
import { Avatar, Box, ListItem, Scrollable, Select, Text } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Page() {
  const auth = useAuth();

  const [themePreference, setThemePreference] = useLocalStorage<'dark' | 'light' | 'system'>('themePreference');

  async function handleChangeTheme(e: RbkInputEvent, value: InputValue) {
    setThemePreference(value);
  }

  async function handleLogout() {
    await auth.logout();
    router.replace('/');
  }

  return (
    <>
      <ScreenOptions title="Ajustes" />

      <Scrollable contentInset={4}>
        <Box flex g={1}>
          <LinkChild href="/profile">
            <ListItem chevron>
              <Box>
                <Avatar source={require('@/assets/images/rick.jpg')} />
              </Box>
              <Box flex>
                <Text variant="title">{auth?.user?.name}</Text>
                <Text variant="secondary">{auth?.user?.email}</Text>
              </Box>
            </ListItem>
          </LinkChild>

          <ListItem>
            <Box>
              <Icon name="theme-light-dark" />
            </Box>
            <Box flex>
              <Text>Tema</Text>
            </Box>
            <Box w={140}>
              <Select
                m={-2}
                value={themePreference}
                options={[
                  { label: 'Sistema', value: 'system' },
                  { label: 'Claro', value: 'light' },
                  { label: 'Escuro', value: 'dark' },
                ]}
                onChange={handleChangeTheme}
              />
            </Box>
          </ListItem>

          <Box mt="auto">
            <ListItem onPress={handleLogout}>
              <Box>
                <Icon color="error" name="logout" />
              </Box>
              <Box flex>
                <Text>Sair</Text>
              </Box>
            </ListItem>
          </Box>
        </Box>
      </Scrollable>
    </>
  );
}
