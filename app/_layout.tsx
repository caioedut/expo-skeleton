import { useColorScheme } from 'react-native';

import ReactBulk from '@react-bulk/native';

import Layout from '@/components/Layout';
import dark from '@/themes/dark';
import light from '@/themes/light';

export default function App() {
  const scheme = useColorScheme();

  return (
    <ReactBulk theme={scheme === 'dark' ? dark : light}>
      <Layout />
    </ReactBulk>
  );
}
