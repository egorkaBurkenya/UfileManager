'use strict';

const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fs = require('fs');

function log_info(info) {
  console.group('\nuMen update to 🔮:')
  console.log(`Version - ${info.version}`)
  console.log('\npress ENTER');
  console.groupEnd();
}

exec('git pull', function(err, stdout, stderr) {
  if (err) throw err
  if (stdout.trim() == 'Already up to date.') {
    console.log('The last version ✨\n');
  } else {
    fs.readFile('info.json', (err, data) => {
      if (err) throw err
      let info = JSON.parse(data)
      log_info(info)
    })
  }
  process.stdout.write(`umen-terminal~ `)
})


process.stdin.on('data', data => {
  let com = data.toString().trim().toLowerCase() 

  if (com == '--v') {
    fs.readFile('info.json', (err, data) => {
      if (err) throw err
      let info = JSON.parse(data)
      info = JSON.stringify(info, null, 1)
      console.log('\n' + info);
    })
  } else if (com == '--help') {
    console.log('some help');
  }else if (com == 'i python') {
    process.stderr.write('\n instaling python3 🐍...\n\n')
    spawn('sudo', ['apt', 'install', 'python3']).stdout.pipe(process.stdout)
  } else if (com == 'i sl') {
    process.stderr.write('\n instaling sl 🚅...\n\n')
    spawn('sudo', ['apt', 'install', 'sl']).stdout.pipe(process.stdout)
  }
  process.stdout.write(`umen-terminal~ `) 
})

