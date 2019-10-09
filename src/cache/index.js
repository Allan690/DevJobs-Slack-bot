const RedisCacheSingleton = require('./redisCache');
const LRUCacheSingleton = require('./lruCache');

const cache = process.env.REDIS_URL.startsWith('redis')
  ? new RedisCacheSingleton()
  : new LRUCacheSingleton();

module.exports = cache;
