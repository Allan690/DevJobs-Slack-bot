import LRUCacheSingleton from './lruCache';
import RedisCacheSingleton from './redisCache';
import env from '../config/environment';

const cache = env.REDIS_URL.startsWith('redis')
  ? new RedisCacheSingleton()
  : new LRUCacheSingleton();

export default cache;
