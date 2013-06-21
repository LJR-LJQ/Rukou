// [导出]
exports.name = 'mtime';
exports.serviceId = 'f6171814-5138-45b0-8ab4-962376bcd9ef';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;

// [模块]

// [变量]
var actionMap = {};
var history = [];
var historyList = [];

// [流程]
actionMap['create history'] = onCreateHistory;
actionMap['retrive history'] = onRetriveHistory;
actionMap['append history'] = onAppendHistory;

// 生成模拟数据
createHistory();
historyList.push(history);

// [函数]
function serveIt(req, callback) {
	var handler;
	debugger;
	handler = actionMap[req.action];
	if (handler) {
		handler(req, callback);
	} else {
		safeCall(callback, {error: 'unknown action'});
	}
}

function requestOtherService(req, callback) {
	safeCall(callback, {error: 'service not found'});
}

function onCreateHistory(req, callback) {
	var newHistoryid = historyList.length;
	var history = {};
	historyList.push(history);

	// 返回 historyId 即可
	callback({historyId: newHistoryid});
}

function onAppendHistory(req, callback) {
	var historyId = req.historyId,
		history = req.history,
		targetHistory;

	// 找到对应的 history
	targetHistory = historyList[historyId];
	if (!targetHistory) {
		callback({error: 'history not found'});
		return;
	}

	// 拼接上去
	while(history.length > 0) {
		targetHistory.push(history.pop());
	}

	// 完成了，什么都不用返回
	callback({});
}

function onRetriveHistory(req, callback) {
	var startIndex = req.startIndex,
		maxLength = req.maxLength,
		historyId = req.historyId;

	// 根据 historyId 进行查找
	var history = historyList[historyId];
	if (!history) {
		callback({error: 'history not found'});
		return;
	}

	// 取出客户端要求的片段返回
	var historySegment = history.slice(startIndex, startIndex + maxLength);
	callback({
		history: historySegment
	});
}

function createHistory(){
	var list = [
		['/1', '创建 HTTP Server', '0'],
		['/1', '创建 HTTP Server', '1', '开始处理客户端请求'],
		['/1/1', '为客户端提供服务', '0', ''],
		['/1/1/2', '获取客户端请求的 Method', '1', 'GET'],
		['/1/1/3', '获取客户端请求的地址', '1', '/file-explorer/index.html'],
		['/1/1/4', '计算出物理路径', '1', 'd:\\rukou\\website\\file-explorer\\index.html'],
		['/1/1/5', '获取路径所指向的文件的字节长度信息', '1', '115523403 bytes'],
		['/1/1/6', '向客户端发送文件内容', '0', '5% 已发送，平均速度 44KB/s 已耗时 1'],
		['/1/1/6', '向客户端发送文件内容', '0', '23% 已发送，平均速度 152KB/s 已耗时 2s'],
		['/1/1/6', '向客户端发送文件内容', '0', '91% 已发送，平均速度 44KB/s 已耗时 3s'],
		['/1/1/6', '向客户端发送文件内容', '0', '100% 已发送，平均速度 44KB/s 已耗时 4s'],
		['/1/1/6', '向客户端发送文件内容', '1', '100% 已发送，平均速度 44KB/s 已耗时 4s'],
		['/1/1', '为客户端提供服务', '1', ''],
	];

	list.forEach(function(item) {
		var dateTime = nextTime(1000);
		var explainItem = historyItem(dateTime, item[0], item[1], item[2], item[3]);
		history.push(explainItem);
	});

	function historyItem(dateTime, path, actionName, actionStatus, ps) {
		var o = {
			dateTime: dateTime,
			path: path,
			actionName: actionName,
			actionStatus: actionStatus,
			ps: ps
		};
		return o;
	}

	var lastDate;
	function nextTime(ms) {
		if (!lastDate) {
			lastDate = new Date();
		}

		if (ms) {
			lastDate = new Date(lastDate.valueOf() + ms);
		}

		return lastDate;
	}
};