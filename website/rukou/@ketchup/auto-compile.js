// [模块]
var http = require('http'),
	path = require('path'),
	fs = require('fs');

// [变量]
var inputFile,
	outputFile;

// [流程]
inputFile = path.resolve(__dirname, 'index.k');
outputFile = path.resolve(__dirname, '../index.html');

autoCompile(inputFile, outputFile);

// [函数]
function request(reqObj, resCallback) {
	if (typeof reqObj !== 'object') return;
	var options = {
		hostname: '127.0.0.1',
		port: 80,
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=utf-8'
		}
	};

	var req = http.request(options);
	req.on('error', onError);
	req.on('response', onResponse);
	req.end(JSON.stringify(reqObj));

	// [函数]
	function onError(err) {
		console.log(err.toString());
	}

	function onResponse(res) {
		if (res.statusCode !== 200) return;

		var chunks = [],
			totalBytes = 0;

		res.on('data', onData);
		res.on('end', onEnd);

		function onData(chunk) {
			totalBytes += chunk.length;
			chunks.push(chunk);
		}

		function onEnd() {
			if (totalBytes < 1) return;
			var bigBuffer = Buffer.concat(chunks, totalBytes);
			try {
				var resObj = JSON.parse(bigBuffer.toString('utf8'));

				if (typeof resCallback === 'function') {
					try {
						resCallback(resObj);
					} catch(err) {}
				}
			} catch(err) {
				console.log(err.toString());
			}
		}
	}
}

function requestCallback(resObj) {
	if (resObj.error) {
		console.log('compile failed: ' + resObj.error);
		console.log();
	} else {
		var d = new Date();
		console.log('[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']');
		console.log('compiled to: ' + outputFile);
		console.log();
	}
}

// 编译一次
function compileOnce(inputFile, outputFile) {
	var reqObj = {
		serviceId: 'ba12d37a-cef7-4d8d-bf8d-15613c61dafa',
		action: 'compile',
		inputFile: inputFile,
		outputFile: outputFile
	};

	request(reqObj, requestCallback);
}

function autoCompile(inputFile, outputFile) {
	compileOnce(inputFile, outputFile);
	watchModify(inputFile, onModify);

	function watchModify(filename, notifyCallback) {
		if (typeof notifyCallback !== 'function') return;
		fs.watchFile(filename, {interval: 1000}, function(curr, prev) {
			if (curr.mtime > prev.mtime) {
				notifyCallback();
			}
		})
	}

	function onModify() {
		compileOnce(inputFile, outputFile);
	}
}