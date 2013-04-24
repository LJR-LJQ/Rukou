exports.name = 'Service Manager';
exports.serviceId = 'ecb30d58-086e-4bf1-b6f7-2b07c2b5a247';
exports.serveIt = serveIt;

// [变量]
var websiteManager;

// [流程]
websiteManager = require('./website-manager.js');

function serveIt(req, callback) {
	if (req.serviceId === websiteManager.serviceId) {
		websiteManager.serveIt(req, callback);
	} else {
		safeCall(callback, {error: 'unknown service id'});
	}

	function callbackProxy(resObj) {
		// 响应时也要带上服务编号
		if (typeof resObj === 'object') {
			resObj.serviceId = exports.serviceId;
		}

		safeCall(callback, resObj);
	}

	function safeCall(callback, resObj) {
		if (typeof callback !== 'function') return;
		try {
			callback(resObj);
		} catch(err) {

		}
	}
}