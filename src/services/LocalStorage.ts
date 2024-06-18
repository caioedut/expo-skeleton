import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = {
  async clear() {
    await AsyncStorage.clear();
  },

  async keys() {
    return AsyncStorage.getAllKeys();
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },

  async set(key: string, value?: any) {
    await AsyncStorage.setItem(key, JSON.stringify({ value }));
  },

  async get<Type = any>(key: string, defaultValue?: Type): Promise<Type | undefined> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();

      if (allKeys.includes(key)) {
        const item = await AsyncStorage.getItem(key);
        const json = JSON.parse(item ?? '');
        return json?.value ?? defaultValue;
      }
    } catch {}

    return defaultValue;
  },
};

export default LocalStorage;
