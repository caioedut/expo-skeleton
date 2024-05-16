import { execSync } from 'node:child_process';
import pmex, { args } from 'pmex';

import 'dotenv-auto';

const branch = execSync('git branch --show-current').toString().trim();

if (!['main', 'master'].includes(branch)) {
  throw new Error('Submit is allowed only for branches "master" and "main".');
}

pmex(`eas submit --non-interactive --latest ${args()._raw}`);
