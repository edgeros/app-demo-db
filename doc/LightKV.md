# LightKV 示例

## 导入

```javascript
var LightKV = require('lightkv');
```

## 建库

```javascript
var kv = new LightKV('./lightkv.db', 'c+', LightKV.OBJECT);
```

- `arg1` 数据库文件名。
- `arg2` 打开标志，**默认值：`'c+' `** 。
- `arg3` 表示数据所在数据库存储的类型，**默认值：LightKV.BUFFER** 。

## 初始化计数器

如果 `access` 不存在则初始化为 0。

```javascript
if (!kv.has('access')) {
	kv.set('access', { count: 0 });
}
```

## 计数变量自增

接收前端请求对 `access` 的 `count` 属性自增 1。

```javascript
router.get('/access', function(req, res) {
	var count = kv.get('access').count;
	count++;
	kv.set('access', {count: count});
	res.json({count: count});
});
```

在前端页面上布局一个按钮和一个数值展示，用户点击按钮即可发送 `access` 请求到服务端,下面程序是通过  `Vue` 的 `Axios` 库来向服务端发送 `HTTP` 请求。

```javascript
onAccess: function () {
	const auth = {
		'edger-token': this.token,
		'edger-srand': this.srand
    };
	axios.get('/lightkv/access',{}, {headers: auth})
	.then(res => {
		// ...
	})
	.catch(function (error) {
		console.log(error);
	});
}
```
