import pmex from 'pmex';

pmex(`prettier "{app,scripts,src,test}/**/*.{js,jsx,ts,tsx}" --check`);

pmex(`eslint "{app,scripts,src,test}/**/*.{js,jsx,ts,tsx}" --max-warnings=0`);

pmex(`tsc --noEmit`);
