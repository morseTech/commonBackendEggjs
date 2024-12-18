使用redis作为cache, 框架中配合egg-redis使用

接口为./Cache.js,   {class} Cache

const Cache = required('./Cache.js');
const cache = new Cache();

await cache.set(k,v,s);
await cache.get(k);
await cache.destroy();

使用redis作为消息队列

接口为./Queue.js,   {class} Queue

const Queue = required('./Queue.js');
const Queue = new Queue();

await Queue.addChanel('testchanel');
await Queue.pub('testchanel','messsage1');
await Queue.addSub('testchanel','functionName',function(res){ // do with res });