import { Card, Scrollable, Text } from '@react-bulk/native';

import Head from '@/components/Head';

export default function Page() {
  return (
    <>
      <Head title="Settings" />

      <Scrollable contentInset={4}>
        <Card>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam commodi deserunt eum illo incidunt ipsa
            itaque molestiae molestias, nisi omnis porro provident qui quia quis sequi, sint sit tempora?
          </Text>
        </Card>
      </Scrollable>
    </>
  );
}
