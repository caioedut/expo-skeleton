import 'dotenv-auto';

import { writeFileSync } from 'node:fs';

import { format } from 'date-fns';

import appJSON from '../app.json';

const version = format(new Date(), 'yy.MMdd.HH');
const versionCode = +version.replace(/\D/g, '');

appJSON.expo.version = version;
appJSON.expo.android.versionCode = versionCode;

writeFileSync('app.json', JSON.stringify(appJSON, null, 2), { encoding: 'utf-8' });

console.log('version:', version);
console.log('versionCode:', versionCode);
