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
var SyncTable = require('synctable');

const Router = WebApp.Router;
const router = Router.create();

var table = new SyncTable('table1');
if (!table.has('count')) {
	table.set('count', 0);
}

router.get('/access', function(req, res) {
	var count = table.get('count');
	count++;
	table.set('count', count);
	res.json({count: count});
});

module.exports = router;
