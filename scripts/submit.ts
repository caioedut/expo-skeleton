import { execSync } from 'child_process';
import pmex from 'pmex';

import 'dotenv-auto';

const args = process.argv.slice(2).join(' ');
const branch = execSync('git branch --show-current').toString().trim();

if (branch !== 'master') {
  throw new Error('Build is allowed only for branch "master".');
}

pmex(`eas submit --non-interactive --latest ${args}`);
