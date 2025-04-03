import { api } from '@/helpers/api.helper';
import { string } from '@/helpers/string.helper';

const ApiAdmin = api({
  baseURL: string(process.env.EXPO_PUBLIC_API_URL),
});

export default ApiAdmin;
