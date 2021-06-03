# SQLite3 示例

## 导入

```javascript
var Sqlite3 = require('sqlite3');
```
## 建库

```javascript
var db = Sqlite3.open(':memory:');
```

- `arg1` `:memory:` 则表示创建一个匿名的内存数据库,也可以自定义 `./x.db3` 。

## 建表

```javascript
db.run('CREATE TABLE user(name text, age int);');
```

`db.run(arg1)` 表示执行一段 `sql` 脚本，上面建表语句创建了一个名为 `user` 的表，字段有 `name`，字段类型为 `text`。  `age` 字段的类型为 `int`，`sql` 脚本的写法参考 `SQLite3` 的语法。

## 查询数据

下面程序监听客户端发来的查询 `user` 数据请求， 通过 `db.prepare(arg1)` 执行了查询 `user` 表达 `sql` 脚本，之后遍历查询出的结果集，最后`stmt.finalize()` 结束查询。

```javascript
router.get('/list', function(req, res) {
	var data = [];
	// 查询user表的所有记录
	var stmt = db.prepare('SELECT * FROM user;');
	//遍历结果集
	do {
		var ret = stmt.step((row) => {
			data.push({name: row.name, age: row.age});
		});
	} while (ret === Sqlite3.ROW);
	// 完成一条sql语句
	stmt.finalize();
	res.json(data);
});
```

前端发送查询请求：

```javascript
getUsers: function () {
	const auth = {
		'edger-token': this.token,
		'edger-srand': this.srand
	};
	axios.get('/sqlite/list', {}, {headers: auth})
	.then(res => {
		// ...
	})
	.catch(function (error) {
		console.log(error);
	});
}
```

## 添加数据

下面程序将前端提交的 `user` 数据插入到 `SQLite3` 数据库的 `user` 表中。

```javascript
router.post('/add', function(req, res) {
	// 拿到提交的数据
	var user = req.body;
	// 运行sql脚本插入到数据库user表中
	db.run('INSERT INTO user VALUES(?, ?);', user.name, user.age);
	res.json({ret: true});
});
```

前端提交数据：

```javascript
addUser: function () {
	const auth = {
		'edger-token': this.token,
		'edger-srand': this.srand
	};
	axios.post('/sqlite/add', { name: this.name, age: this.age },{headers: auth})
	.then(res => {
		// ...
	})
	.catch(function (error) {
		console.log(error);
	});
}
```
