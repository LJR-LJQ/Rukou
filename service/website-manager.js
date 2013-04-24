exports.name = 'Website Service';
exports.serviceId = 'a9d7df7e-8bca-4efa-88ad-654a5a989319';
exports.serveIt = serveIt;

// [常量]
var action_queryDefaultWebsite = 'query default website',
	action_queryWebsite = 'query website',
	action_respond = 'respond';

// [模拟数据]
var websiteTable = {
	defaultWebsiteId: '74b05281-f834-460d-8bc5-05415223a6e6',
	websiteList: [
		{
			websiteId: '74b05281-f834-460d-8bc5-05415223a6e6',
			rootDir: 'service-data/website-manager/root/'
		}
	]
}

prepareForFastMap();

function serveIt(req, callback) {
	if (req.action === action_queryDefaultWebsite) {
		if (websiteTable.defaultWebsiteId) {
			var defaultWebsite = websiteTable.websiteList[websiteTable.defaultWebsiteId];
			if (defaultWebsite) {
				safeCall(callback, defaultWebsite);
				return;
			}
		}
		safeCall(callback, {error: 'default website not found'});
	} else if (req.action === action_queryWebsite) {
		var website = websiteTable.websiteList[req.websiteId];
		if (website) {
			safeCall(callback, website);
		} else {
			safeCall(callback, {error: 'website not found'});
		}
	} else if (req.action === action_respond) {
		safeCall(callback, {error: 'not implemented'});
	} else {
		safeCall(callback, {error: 'unknown action'});
	}

	function safeCall(callback, resObj) {
		if (typeof callback !== 'function') return;
		try {
			callback(resObj);
		} catch(err) {

		}
	}
}

function prepareForFastMap() {
	if (!websiteTable || !websiteTable.websiteList || websiteTable.websiteList.length < 1) return;
	for (var i = 0, len = websiteTable.websiteList.length; i < len; ++i) {
		var website = websiteTable.websiteList[i];
		if (website.websiteId) {
			websiteTable.websiteList[website.websiteId] = website;
		}
	}
}