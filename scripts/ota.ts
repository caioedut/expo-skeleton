import { execSync } from 'node:child_process';
import pmex, { args } from 'pmex';

import 'dotenv-auto';

const message = execSync('git log -1 --pretty=%B')
  .toString()
  .replace(/[\r\n]/gm, ' ')
  .trim();

const params = args({
  message,
  'non-interactive': true,
});

pmex(`eas update ${params.$}`);
