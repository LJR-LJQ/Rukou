// [导出]
exports.name = 'mtime';
exports.serviceId = 'b0ae2e86-a1b6-4e9d-a245-0173e6e8b857';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;
exports.initialize = initialize;

// [模块]
var fs = require('fs'),
	path = require('path');

// [变量]
var actionMap = {},
	rootDir = path.resolve(__dirname, '../website/');

// [流程]
actionMap['retrive mtime'] = onRetriveMtime;

// [函数]
function initialize() {
}

function serveIt(req, callback) {
	var handler;

	handler = actionMap[req.action];
	if (handler) {
		handler(req, callback);
	} else {
		safeCall(callback, {error: 'unknown action'});
	}
}

function safeCall(callback, resObj) {
	if (typeof callback !== 'function') return;
	try {
		callback(resObj);
	} catch(err) {

	}
}

function requestOtherService(req, callback) {
	safeCall({error: 'service not found'});
	
}

// [用户请求处理]
function onRetriveMtime(req, callback) {
	var decodedPath,
		filePathAbs,
		mtime;

	decodedPath = req.path;

	filePathAbs = path.join(rootDir, decodedPath);
	try {
		mtime = fs.statSync(filePathAbs).mtime;
	} catch(err) {
		safeCall(callback, {error: 'retrive mtime failed'});
		return;
	}

	safeCall(callback, {mtime: mtime});
}