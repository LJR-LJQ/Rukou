// [模块]
var request = require('./lib/request.js').request;

// [变量]
var dataObjectId;

// [流程]
if(process.argv.length < 3 || process.argv.length > 4) {
	showUsage();
	return;
}

if (process.length === 4 && process.argv[1].toLowerCase() !== 'debug') {
	showUsage();
	return;
}

dataObjectId = process.argv.length === 4 ? process.argv[3] : process.argv[2];

var reqObj = {
	serviceId: '688c8673-ddf6-467a-860e-938a21e2e1f3',
	action: 'retrieve data object',
	dataObjectId: dataObjectId
};

request(reqObj, requestCallback);

// [函数]
function requestCallback(resObj) {
	if (resObj.error) {
		console.log(resObj.error);
		return;
	}

	console.log(JSON.stringify(resObj.dataObject));
}

function showUsage() {
	console.log('node [debug] retrive-data-object.js <dataObjectId>');
}