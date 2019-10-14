import redis, { RedisClient } from 'redis'
import { promisify } from 'util'

class RedisCacheSingleton {
  private static exists: RedisCacheSingleton;
  private static instance: RedisCacheSingleton;
  private client: RedisClient
  constructor() {
    if (RedisCacheSingleton.exists) {
      return RedisCacheSingleton.instance;
    }
    this.client = redis.createClient(process.env.REDIS_URL);
    this.client.getAsync = promisify(this.client.get);
    this.client.setAsync = promisify(this.client.set);
    this.client.setexAsync = promisify(this.client.setex);
    this.client.delAsync = promisify(this.client.del);
    this.client.flushallAsync = promisify(this.client.flushall);

    RedisCacheSingleton.instance = this;
    RedisCacheSingleton.exists = this;
  }

  public async save(key: string, field: string, value: any) {
    const currentState = await this.fetch(key);
    if (!currentState) {
      return this.saveObject(key, { [field]: value });
    }
    currentState[field] = value;
    return this.client.setAsync(key, JSON.stringify(currentState));
  }

  public async fetch(key: string) {
    const result = await this.client.getAsync(key);
    return result ? JSON.parse(result) : result;
  }

  public async saveObject(key: string, value: any) {
    const maxCacheAge = 300000;
    return this.client.setexAsync(key, maxCacheAge, JSON.stringify(value));
  }

  public async delete(key: string) {
    return this.client.delAsync(key);
  }

  public async flush() {
    return this.client.flushallAsync();
  }
}

export default RedisCacheSingleton;
