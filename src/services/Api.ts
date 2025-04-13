import { Str } from 'hpr';

import { api } from '@/helpers/api.helper';

const ApiAdmin = api({
  baseURL: Str.from(process.env.EXPO_PUBLIC_API_URL),
});

export default ApiAdmin;
