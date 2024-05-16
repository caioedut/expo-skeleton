import { execSync } from 'node:child_process';
import pmex, { args } from 'pmex';

import 'dotenv-auto';

const branch = execSync('git branch --show-current').toString().trim();

if (!['main', 'master'].includes(branch)) {
  throw new Error('Build is allowed only for branches "master" and "main".');
}

pmex(`eas build --non-interactive --clear-cache ${args()._raw}`);
