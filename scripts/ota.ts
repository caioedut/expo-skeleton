import { execSync } from 'child_process';
import pmex, { args } from 'pmex';

import 'dotenv-auto';

const message = execSync(`git log -1 --pretty=%B`)
  .toString()
  .replace(/[\r\n]/gm, ' ')
  .trim();

pmex(`eas update --non-interactive --message="${message}" ${args()._raw}`);
