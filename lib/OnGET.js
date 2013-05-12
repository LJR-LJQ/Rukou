// [导出]
exports.handleIt = handleIt;
exports.serviceManager = null;

// [模块]
var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');

// [变量]
var rootDir = path.resolve(__dirname, '../website/');

// [函数]
function handleIt(req, res) {
	// 处理步骤描述
	// 1、如果客户端请求的是 '/' ，则将用户重定向到 /rukou/ ，并不再继续执行后续步骤
	// 2、根据客户端请求路径组合出完整的文件绝对路径，如果文件存在，则直接返回文件内容，否则返回 404

	// [变量]
	var serviceManager;

	var rawReqUrl,
		decodedReqUrl,
		parsedReqUrlObj;

	var filePathAbs;

	// [流程]
	serviceManager = exports.serviceManager;

	// 解析 URL
	rawReqUrl = req.url;
	decodedReqUrl = decodeURIComponent(rawReqUrl);
	parsedReqUrlObj = url.parse(decodedReqUrl);

	// 如果请求的是 '/' 则重定向到 '/rukou/index.html'
	if (parsedReqUrlObj.pathname === '/') {
		var location = 'http://' + req.headers['host'] + '/rukou/index.html';
		res.statusCode = 307;
		res.setHeader('Location', location);
		res.end();
		return;
	}

	// 拼接出实际的路径，故意忽略安全问题
	filePathAbs = path.join(rootDir, parsedReqUrlObj.pathname);
	sendIt(filePathAbs, function(errorText) {
		res.statusCode = 404;
		res.end();
		/*
		filePathAbs = path.join(filePathAbs, '/index.html');
		if (errorText.indexOf('EISDIR') !== -1) {
			sendIt(filePathAbs, function() {
				res.statusCode = 404;
				res.end();
			});
		} else {
			res.statusCode = 404;
			res.end();
		}
		*/
	});

	function sendIt(filePathAbs, failedCallback) {
		// 如果文件不存在，那么就返回错误
		if (!fs.existsSync(filePathAbs)) {
			if (failedCallback) {
				failedCallback('file not found');
			}
			return;
		}

		// 如果文件尺寸为零，那么就不需要读取了
		try {
			var size = fs.lstatSync(filePathAbs).size;
			if (size < 1) {
				res.setHeader('content-type', mime(filePathAbs));
				res.end();
				return;
			}
		} catch(err) {
			if (failedCallback) {
				failedCallback('query file size failed');
			}
			return;
		}

		// 读取并返回文件内容
		var stream = fs.createReadStream(filePathAbs);
		stream.once('readable', onReadable);
		stream.on('error', function(err) {
			console.log('[ERR] ' + filePathAbs);
			if (failedCallback) {
				failedCallback(err.toString());
			}
		});

		function onReadable() {
			console.log('[OK]  ' + filePathAbs);
			res.setHeader('content-type', mime(filePathAbs));
			stream.pipe(res);
		}
	}
}


function mime(filename) {
	var ext,
		contentType;
	ext = path.extname(filename);
	if (ext) {
		ext = ext.toLowerCase();
	}
	switch (ext) {
		case '.htm':
		case '.html':
			contentType = 'text/html';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.jpe':
		case '.jpg':
		case '.jpeg':
			contentType = 'image/jpeg';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.gif':
			contentType = 'image/gif';
			break;
		default:
			contentType = 'application/octet-stream';
			break;
	}
	return contentType;
}