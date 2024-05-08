import pmex, { args } from 'pmex';

import 'dotenv-auto';

pmex(`npx expo start --no-dev --minify ${args()._raw}`);
