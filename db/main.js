#! /bin/javascript

/*
 * Copyright (c) 2020 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: main.js.
 *
 * Author: liping@acoinfo.com
 *
 */
const Web = require('webapp');
const bodyParser = require('middleware').bodyParser;

/* Create app */
const app = Web.createApp();

app.use(bodyParser.json());
app.use(Web.static('./public', { index: ['index.html', 'index.htm'] }));

app.use('/api/sqlite', require('./routers/sqlite'));
app.use('/api/lightkv', require('./routers/lightkv'));
app.use('/api/synctable', require('./routers/synctb'));

// Start app.
app.start();

/* Event loop */
require('iosched').forever();
