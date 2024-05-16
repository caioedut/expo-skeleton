import pmex, { args } from 'pmex';

import 'dotenv-auto';

pmex({
  bun: 'install',
  npm: 'install && npm prune',
  pnpm: 'install --fix-lockfile',
  yarn: 'install --check-files',
});

pmex('npx expo install --fix');

pmex(`npx expo start ${args()._raw}`);
