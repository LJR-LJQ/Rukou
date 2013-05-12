// [模块]
var request = require('./lib/request.js').request;

// [变量]
var dataObjectId;

// [流程]
if(process.argv.length > 3) {
	showUsage();
	return;
}

if (process.length === 3 && process.argv[1].toLowerCase() !== 'debug') {
	showUsage();
	return;
}

dataObjectId = '0.30924026505090296';

var reqObj = {
	serviceId: '688c8673-ddf6-467a-860e-938a21e2e1f3',
	action: 'update data object',
	dataObjectId: dataObjectId,
	dataObject: {}
};

request(reqObj, requestCallback);

// [函数]
function requestCallback(resObj) {
	if (resObj.error) {
		console.log(resObj.error);
	} else {
		console.log('clear successfully');
	}
}

function showUsage() {
	console.log('node [debug] clear-group-online.js');
}