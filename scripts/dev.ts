import pmex, { args } from 'pmex';

import 'dotenv-auto';

pmex({
  bun: 'install',
  npm: 'install && npm prune',
  pnpm: 'install --fix-lockfile',
  yarn: 'install --check-files',
});

pmex('dlx expo install --fix');

const params = args({
  c: true,
  go: true,
});

pmex(`dlx expo start ${params.$}`);
