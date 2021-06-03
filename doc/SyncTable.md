# SyncTable 示例

## 导入

```javascript
var SyncTable = require('synctable');
```

## 建表

下面程序创建了一个名称为`table1`的同步表：

```javascript
var table = new SyncTable('table1');
```

## 初始化计数器

如果 `count` 变量不存在就初始化一个：

```javascript
if (!table.has('count')) {
	table.set('count', 0);
}
```

## 计数变量自增

下面程序接收前端发送 `access` 请求，获取到 `table` 里的 `count` 计数器，自增一，然后更新到 `table` 中。

```javascript
router.get('/access', function(req, res) {
    // 获取count变量
	var count = table.get('count');
	count++;
    // 更新count
	table.set('count', count);
	res.json({count: count});
});
```

前端发送 `aceess` 请求：

```javascript
onAccess: function () {
	const auth = {
		'edger-token': this.token,
		'edger-srand': this.srand
	};
	axios.get('/synctable/access', {}, {headers: auth})
	.then(res => {
		// ...
	})
	.catch(function (error) {
		console.log(error);
	});
}
```
