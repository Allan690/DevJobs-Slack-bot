import LRUCache from 'lru-cache';

const cacheOptions = () => ({
  maxAge: 300000
});

class LRUCacheSingleton {
  private static exists: LRUCacheSingleton;
  private static instance: LRUCacheSingleton;
  private cache: LRUCache<string, any>;
  constructor() {
    if (LRUCacheSingleton.exists) {
      return LRUCacheSingleton.instance;
    }
    this.cache = new LRUCache(cacheOptions());
    LRUCacheSingleton.instance = this;
    LRUCacheSingleton.exists = this;
  }

  public getAsync(key: string) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.cache.get(key);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async save(key: string, field: string, value: any) {
    const currentState: any = await this.fetch(key);
    if (!currentState) {
      return this.saveObject(key, { [field]: value });
    }
    currentState[field] = value;
    return this.cache.set(key, currentState);
  }

  public async fetch(key: string) {
    const result = await this.getAsync(key);
    return result;
  }

  public async saveObject(key: string, value: any) {
    const maxCacheAge = 300000;
    return new Promise((resolve, reject) => {
      try {
        const data = this.cache.set(key, value, maxCacheAge);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async delete(key: string) {
    return new Promise((resolve, reject) => {
      try {
        this.cache.del(key);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public async flush() {
    return new Promise((resolve, reject) => {
      try {
        this.cache.reset();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default LRUCacheSingleton;
