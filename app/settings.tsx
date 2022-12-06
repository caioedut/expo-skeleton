import { Stack } from 'expo-router';
import { Card, Scrollable, Text } from '@react-bulk/native';

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />

      <Scrollable contentInset={3}>
        <Card>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam commodi deserunt eum illo incidunt ipsa itaque molestiae
          molestias, nisi omnis porro provident qui quia quis sequi, sint sit tempora?
        </Card>
      </Scrollable>
    </>
  );
}
