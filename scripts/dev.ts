import pmex from 'pmex';

import 'dotenv-auto';

const args = process.argv.slice(2).join(' ');

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex('npx expo install --fix');

pmex(`npx expo start ${args}`);
