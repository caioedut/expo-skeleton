import pmex from 'pmex';

pmex('biome check ./scripts ./src');

pmex('tsc --noEmit --skipLibCheck');
