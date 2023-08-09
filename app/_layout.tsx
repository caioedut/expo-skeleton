import ReactBulk from '@react-bulk/native';

import Layout from '@/components/Layout';
import light from '@/themes/light';

export default function App() {
  return (
    <ReactBulk theme={light}>
      <Layout />
    </ReactBulk>
  );
}
