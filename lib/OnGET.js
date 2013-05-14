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
	// 2、如果客户端请求的是 '/?serviceId=...&p1=v1&p2=v2...'，则将处理过程转给服务完成，并不再继续执行后续步骤
	// 3、根据客户端请求路径组合出完整的文件绝对路径，如果文件存在，则直接返回文件内容，否则返回 404

	// [变量]
	var serviceManager;

	var rawReqUrl,
		decodedReqUrl,
		parsedReqUrlObj;

	var serviceId;

	var filePathAbs;

	// [流程]
	serviceManager = exports.serviceManager;

	// 解析 URL
	rawReqUrl = req.url;
	decodedReqUrl = decodeURIComponent(rawReqUrl);
	parsedReqUrlObj = url.parse(decodedReqUrl, true);

	// 如果请求的是 '/' 则重定向到 '/rukou/index.html'
	// 如果请求的是 '/?...' 则根据解析情况分发给服务处理
	if (parsedReqUrlObj.pathname === '/') {
		if (!parsedReqUrlObj.search) {
			var location = 'http://' + req.headers['host'] + '/rukou/index.html';
			res.statusCode = 307;
			res.setHeader('Location', location);
			res.end();
			return;
		} else {
			serviceId = parsedReqUrlObj.query['serviceId'];
			if (!serviceId) {
				res.statusCode = 400;
				res.end();
			} else {
				serviceManager.dispatchUrl(serviceId, req, res);
			}
			
			return;
		}
	}

	// 拼接出实际的路径，故意忽略安全问题
	filePathAbs = path.join(rootDir, parsedReqUrlObj.pathname);

	// 读取并返回文件内容
	var firstRead = true;
	var stream = fs.createReadStream(filePathAbs);
	stream.once('data', onData);
	stream.once('close', onClose);
	stream.once('error', onError);

	function onData(data) {
		if (firstRead) {
			firstRead = false;
			res.setHeader('content-type', mime(filePathAbs));
		}

		res.write(data);
		stream.pipe(res);
	}

	function onClose() {
		res.end();
	}

	function onError(err) {
		res.statusCode = 404;
		res.end();
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
			contentType = 'text/html;charset=utf-8';
			break;
		case '.js':
			contentType = 'text/javascript;charset=utf-8';
			break;
		case '.css':
			contentType = 'text/css;charset=utf-8';
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