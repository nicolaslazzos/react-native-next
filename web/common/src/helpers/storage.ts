class Storage {
  async setItem(key: string, value: string) {
    value = typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, value);
  }

  async getItem(key: string) {
    const value = localStorage.getItem(key);

    try {
      const res = JSON.parse(value);

      return res;
    } catch (e) {
      return value;
    }
  }

  async clear() {
    localStorage.clear();
  }

  async removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

const storage = new Storage();

export { storage };
