'use strict';

const spawn = require('child_process').spawn;
const fs = require('fs');

let update = spawn('git', ['pull'])
update.stdout.pipe(process.stdout)

let fsWait = true

fs.watchFile('info.json', () => {
  if (!fsWait) return;
  if (fsWait) {
  fs.readFile('info.json', (err, data) => {
    if (err) throw err
    let info = JSON.parse(data)
    log_info(info)
    fsWait = false
  })
  
}
});

function log_info(info) {
  console.group('\nuMen')
  console.log(`Version - ${info.version}`)
  console.groupEnd();
}

process.stdin.on('data', data => {
  let com = data.toString().trim()
  if (com == '--v') {
    fs.readFile('info.json', (err, data) => {
      if (err) throw err
      let info = JSON.parse(data)
      process.stderr.write(info.version)
    }) 
  } else {
    process.stdout.write(`console~ `)
  }
})