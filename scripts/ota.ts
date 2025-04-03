import 'dotenv-auto';

import { execSync } from 'node:child_process';

import pmex, { args } from 'pmex';

const message = execSync('git log -1 --pretty=%B')
  .toString()
  .replace(/[\r\n]/gm, ' ')
  .trim();

pmex(`eas update ${args({ message, 'non-interactive': true }).$}`);
