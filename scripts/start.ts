import pmex, { args } from 'pmex';

import 'dotenv-auto';

const params = args({
  minify: true,
  'no-dev': true,
});

pmex(`dlx expo start ${params.$}`);
