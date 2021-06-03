# Redis
`Redis`（Remote Dictionary Server )，即远程字典服务，是一个开源的支持网络、可基于内存和持久化的日志型、`Key-Value` 数据库。

Redis 是一个高性能的  `key-value` 数据库，在很多方面发挥着重要作用。`EdgerOS` 支持 `Redis` 客户端， 可以轻松连接到 `Redis` 服务器：
```javascript
const iosched = require('iosched');
const redis = require('redis');
const client = redis.createClient({ host: /* Your redis server host*/, port: /*Your redis server port*/ });

client.on('error', function(error) {
	console.error(error);
});

client.set('key', 'value', redis.print);
client.get('key', redis.print);

while (true) {
	iosched.poll();
}
```

关于 `Redis` 更多使用方法，请参考 `API`手册 : 【Database/Redis】。

