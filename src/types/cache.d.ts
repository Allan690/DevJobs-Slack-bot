import redis from 'redis';

declare module 'redis' {
  export interface RedisClient {
    getAsync (key: string): Promise<any>;
    setAsync (key: string, value: any): Promise<any>;
    setexAsync (key: string, second: number, value: any): Promise<any>;
    delAsync (key: string): Promise<any>;
    flushallAsync (): Promise<any>;
  }
}
