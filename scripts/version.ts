import { format } from 'date-fns';
import { writeFileSync } from 'node:fs';

import appJSON from '../app.json';

import 'dotenv-auto';

const version = format(new Date(), 'yy.MMdd.HH');
const versionCode = +version.replace(/\D/g, '');

// @ts-ignore
appJSON.expo.version = version;
// @ts-ignore
appJSON.expo.android.versionCode = versionCode;

writeFileSync('app.json', JSON.stringify(appJSON, null, 2), { encoding: 'utf-8' });

console.log('version:', version);
console.log('versionCode:', versionCode);
