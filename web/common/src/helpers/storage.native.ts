// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  async setItem(key: string, value: string) {
    value = typeof value === "string" ? value : JSON.stringify(value);

    await AsyncStorage.setItem(key, value);
  }

  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);

    try {
      const res = JSON.parse(value);

      return res;
    } catch (e) {
      return value;
    }
  }

  async clear() {
    await AsyncStorage.clear();
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }
}

const storage = new Storage();

export { storage };
