import { Card, Scrollable, Text } from '@react-bulk/native';

import Head from '@/components/Head';
import LinkButton from '@/components/LinkButton';

export default function Page() {
  return (
    <>
      <Head title="Home" />

      <Scrollable contentInset={4}>
        <Card>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam commodi deserunt eum illo incidunt ipsa
            itaque molestiae molestias, nisi omnis porro provident qui quia quis sequi, sint sit tempora?
          </Text>
          <LinkButton align="end" href="/settings" mt={4}>
            Settings
          </LinkButton>
        </Card>
      </Scrollable>
    </>
  );
}
