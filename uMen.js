'use strict';

const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fs = require('fs');

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

function log_info(info) {
  console.group('\nuMen update to 🔮:')
  console.log(`Version - ${info.version}`)
  console.log('\npress ENTER');
  console.groupEnd();
}


function init_python_project(umeinit){
  exec('pip3 freeze', function(err, stdout, stderr) {
      if (err) throw err
      const freeze = stdout.split('\n')
      let libraries_to_install = []
      let include = false
      for (let one_library of umeinit) {
        include = false
        for (let one_freeze of freeze) {
          if (one_library != '-python') {
            if (one_freeze.includes(one_library)) {
              include = true
            } 
          }
        }
        if (!include) {
          if (one_library != '-python') {
          libraries_to_install.push(one_library)
          }
        }
      }
      if (libraries_to_install.length != 0) {
        for (let one_library in libraries_to_install) {
          spawn('sudo', ['pip3', 'install', one_library]).stdout.pipe(process.stdout)
        }
      } else {
        console.log("\nyou already have all libraries installed ! §(*￣▽￣*)§");
      }
  })
}


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
  } else if (com == 'init') {
    const umeinit = fs.readFileSync("../.umeninit", "utf8").split(' ')
    if (umeinit[0] == '-python') {
      init_python_project(umeinit)
    }
  }
  process.stdout.write(`umen-terminal~ `) 
})

