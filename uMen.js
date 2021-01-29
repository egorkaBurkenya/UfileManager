'use strict';

const spawn = require('child_process').spawn;
const fs = require('fs');

fs.readFile('info.json', (err, data) => {
  spawn('git', ['pull']).stdout.pipe(process.stdout);
  if (err) throw err;
  let info = JSON.parse(data);
  console.log(info);
});


// console.group('uMen')
// console.log(`Version - ${info.version}`)
// console.groupEnd();



