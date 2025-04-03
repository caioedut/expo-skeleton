import 'dotenv-auto';

import pmex, { args } from 'pmex';

pmex(`dlx expo start ${args({ minify: true, 'no-dev': true }).$}`);
