import { api } from '@/helpers/api.helper';
import { string } from '@/helpers/string.helper';

const baseURL = string(process.env.EXPO_PUBLIC_API_URL).replace(/\/$/, '');

const ApiDefault = api({
  baseURL,
});

export default ApiDefault;
