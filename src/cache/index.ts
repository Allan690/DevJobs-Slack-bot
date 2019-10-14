import LRUCacheSingleton from './lruCache';
import RedisCacheSingleton from './redisCache';

const cache = process.env.REDIS_URL.startsWith('redis')
  ? new RedisCacheSingleton()
  : new LRUCacheSingleton();

export default cache;
