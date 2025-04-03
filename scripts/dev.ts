import 'dotenv-auto';

import pmex, { args } from 'pmex';

pmex({
  bun: 'install',
  npm: 'install && npm prune',
  pnpm: 'install --fix-lockfile',
  yarn: 'install --check-files',
});

pmex('dlx expo install --fix');

pmex(`dlx expo start ${args({ c: true, go: true }).$}`);
