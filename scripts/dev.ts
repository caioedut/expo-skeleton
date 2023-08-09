import { config } from 'dotenv';
import pmex from 'pmex';

config();

pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install --check-files`,
});

pmex('expo install --fix');

pmex(`expo start --port ${process.env.PORT}`);
