import { useLocalSearchParams } from 'expo-router';

export default function useParams() {
  return {
    // ...useGlobalSearchParams(),
    ...useLocalSearchParams(),
  } as { [key: string]: string };
}
