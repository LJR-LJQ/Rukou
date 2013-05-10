// [导出]
exports.name = 'API Reflection';
exports.serviceId = '7d0bb71e-f6ce-4fe5-8fcb-2d430e67d668';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;
exports.initialize = initialize;

// [变量]
var actionMap = {};

// [流程]
actionMap['retrieve service api'] = onRetrieveServiceApi;
actionMap['update service api'] = onUpdateServiceApi;

// [函数]
function initialize() {
	
}

function serveIt(req, callback) {
	var handler;

	handler = actionMap[req.action];
	if (handler) {
		handler(req,callback);
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
	safeCall(callback, {error: 'service not found'});
}

function onRetrieveServiceApi(req, callback) {
	safeCall(callback, {error: 'not implemented'});
}

function onUpdateServiceApi(req, callback) {
	safeCall(callback, {error: 'not implemented'});
}