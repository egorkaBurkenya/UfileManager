'use strict';

const spawn = require('child_process').spawn;

const update = spawn('git', ['pull'])
update.stdout.pipe(process.stdout);