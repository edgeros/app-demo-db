/*
 * Copyright (c) 2020 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: demo rest api.
 *
 * Author: 
 *
 */
const WebApp = require('webapp');
var Sqlite3 = require('sqlite3');
const Router = WebApp.Router;
const router = Router.create();

/*
 * create db.
 */
var db = Sqlite3.open(':memory:');
db.run('CREATE TABLE user(name text, age int);');

/*
 * res: [{name, age}]
 */
router.get('/list', function (req, res) {
	console.log('Get users.');
	var data = [];
	db.run('SELECT * FROM user;', (row) => {
		data.push(row);
	});
	res.json(data);
});

/*
 * req: {name, age}
 * ret: {ret}
 */
router.post('/add', function (req, res) {
	console.log('Add user.');
	var user = req.body;
	db.run('INSERT INTO user VALUES(?, ?);', user.name, user.age);
	res.json({ ret: true });
});

module.exports = router;
