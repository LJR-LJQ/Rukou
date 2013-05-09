// [模块]
var request = require('./lib/request.js').request;

// [流程]
var reqObj = {
	serviceId: '688c8673-ddf6-467a-860e-938a21e2e1f3',
	action: 'create data object'
};

request(reqObj, requestCallback);

// [函数]
function requestCallback(resObj) {
	if (resObj.error) {
		console.log(resObj.error);
	} else {
		console.log('created: ' + resObj.dataObjectId);
	}
}