const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fs = require('fs');

var childProcess = require("child_process");
var path = require("path");

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
  
  var cp = childProcess.fork(path.join(__dirname, "uMen.js"));
  cp.on("exit", function (code, signal) {
      console.log("Exited", {code: code, signal: signal});
  });
  cp.on("error", console.error.bind(console));

})

function log_info(info) {
  console.group('\nuMen update to 🔮:')
  console.log(`Version - ${info.version}`)
  console.log('\npress ENTER');
  console.groupEnd();
}