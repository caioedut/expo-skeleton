import { Link, Stack } from 'expo-router';

import { Button, Card, Scrollable, Text } from '@react-bulk/native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      <Scrollable contentInset={3}>
        <Card>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam commodi deserunt eum illo incidunt ipsa itaque molestiae
            molestias, nisi omnis porro provident qui quia quis sequi, sint sit tempora?
          </Text>
          <Button component={Link} align="end" href="/settings">
            Settings
          </Button>
        </Card>
      </Scrollable>
    </>
  );
}
