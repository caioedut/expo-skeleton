import pmex, { args } from 'pmex';

pmex('prettier "{app,scripts,src}/**/*.{js,jsx,ts,tsx}" --check');

pmex('eslint "{app,scripts,src}/**/*.{js,jsx,ts,tsx}" --max-warnings=0');

pmex(`tsc ${args({ noEmit: true, skipLibCheck: true }).$}`);
