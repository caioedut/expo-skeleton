import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorage {
  static async clear() {
    await AsyncStorage.clear();
  }

  static async get<Type>(key: string, defaultValue?: Type): Promise<Type | undefined> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();

      if (allKeys.includes(key)) {
        const item = await AsyncStorage.getItem(key);
        const json = JSON.parse(item ?? '');
        return json?.value ?? defaultValue;
      }
    } catch {}

    return defaultValue;
  }

  static async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }

  static async set(key: string, value?: any) {
    await AsyncStorage.setItem(key, JSON.stringify({ value }));
  }
}
