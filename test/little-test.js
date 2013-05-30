var path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec;

var target = 'G:\\GlobalService\\Rukou\\test\\t';

listFiles(target, function(result){
	fs.writeFileSync('o.txt', result);
});


function listFiles(dirPath, scb) {
	if (!dirPath) return;

	var cmd = 'dir /B /A:-D "' + dirPath + '"';
	exec(cmd, function(err, stdout, stderr) {
		if (stdout) {
			scb(stdout);
		}
	});
}

function listDirs(dirPath, scb) {
	if (!dirPath) return;

	var cmd = 'dir /B /A:D "' + dirPath + '"';
	console.log(cmd);
	exec(cmd, function(err, stdout, stderr) {
		if (stdout) {
			scb(stdout);
		}
	});
}