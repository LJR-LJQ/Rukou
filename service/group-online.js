// [导出]
exports.name = 'Group Online';
exports.serviceId = '073b3984-58e5-4277-bde3-ab8081c88022';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;
exports.initialize = initialize;

// [常量]
var serviceId_CentralDatabase = '688c8673-ddf6-467a-860e-938a21e2e1f3';
var dataObjectId = '0.30924026505090296';

// [变量]
var actionMap = {},
	dataObject;

var dataClean = true,
	saving = false;

// [流程]
actionMap['pull'] = onPull;
actionMap['push'] = onPush;

// [函数]
function initialize() {
	// 在系统初始化的时候，会尝试加载数据库中的数据对象
	// 如果加载失败，后续服务将不可进行
	var reqObj = {
		serviceId: serviceId_CentralDatabase,
		action: 'retrieve data object',
		dataObjectId: dataObjectId
	};
	exports.requestOtherService(reqObj, callback);

	function callback(resObj) {
		if (resObj.error) {
			console.error('Group Online Error: retrive data object failed');
		} else {
			dataObject = resObj.dataObject;

			if (typeof dataObject.messageList !== 'object') {
				dataObject.messageList = [];
			}

			// 启动数据自动保存功能
			startAutoSave();
		}
	}
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
	safeCall(callback, {error: 'service not found'});
}

// [用户请求处理]
function onPull(req, callback) {
	if (!dataObject) {
		safeCall(callback, {error: 'service initialize failed'});
		return;
	}

	var lastMessageId = req.lastMessageId;
	if (typeof lastMessageId !== 'number') {
		responseRange(0, dataObject.messageList.length);
	} else {
		responseRange(lastMessageId+1, dataObject.messageList.length);
	}

	function responseRange(start, end) {
		if (end <= start || start < 0 || end > dataObject.messageList.length) {
			safeCall(callback, {messageList: []});
			return;
		}

		var messageList = [];
		for (var i = start; i < end; ++i) {
			messageList.push(dataObject.messageList[i]);
		}
		safeCall(callback, {messageList: messageList});
	}
}

function onPush(req, callback) {
	if (!dataObject) {
		safeCall(callback, {error: 'service initialize failed'});
		return;
	}

	// 检查 req 的格式
	// todo
	var authorId,
		content,
		messageId,
		dateTime;

	authorId = req.authorId;
	content = req.content;
	dateTime = new Date();
	messageId = dataObject.messageList.length;

	var messageItem = {
		messageId: messageId,
		authorId: authorId,
		dateTime: dateTime,
		content: content
	};

	dataClean = false;
	dataObject.messageList.push(messageItem);

	safeCall(callback, {});
}

function startAutoSave() {
	setInterval(function() {
		if (dataClean || saving) return;
		saving = true;
		doSave(function() {
			saving = false;
		});
	}, 5000);

	function doSave(saveCallback) {
		if (!dataObject) return;

		var req = {
			serviceId: serviceId_CentralDatabase,
			action: 'update data object',
			dataObjectId: dataObjectId,
			dataObject: dataObject
		};

		// 执行保存操作
		exports.requestOtherService(req, requestCallback);

		function requestCallback(resObj) {
			if (resObj.error) {
				console.log('Group Online save data failed: ' + resObj.error);
			} else {
				dataClean = true;
				console.log('Group Online save date ok');
			}

			if (saveCallback) {
				saveCallback();
			}
		}
	}
}