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
var LightKV = require('lightkv');

const Router = WebApp.Router;
const router = Router.create();

var kv = new LightKV('./lightkv.db', 'c+', LightKV.OBJECT);
if (!kv.has('access')) {
	kv.set('access', { count: 0 });
}

router.get('/access', function(req, res) {
	var count = kv.get('access').count;
	count++;
	kv.set('access', {count: count});
	res.json({count: count});
});

module.exports = router;
