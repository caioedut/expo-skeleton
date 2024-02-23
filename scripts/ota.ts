import { execSync } from 'child_process';
import pmex from 'pmex';

import 'dotenv-auto';

const args = process.argv.slice(2).join(' ');
const message = execSync(`git log -1 --pretty=%B`).toString().trim();

pmex(`eas update --non-interactive --message="${message}" ${args}`);
