// [导出]
exports.name = 'Central Database';
exports.serviceId = '688c8673-ddf6-467a-860e-938a21e2e1f3';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;
exports.initialize = initialize;

// [模块]
var fs = require('fs'),
	path = require('path');

// [常量]
var ApiReflection = {
	serviceId: '7d0bb71e-f6ce-4fe5-8fcb-2d430e67d668',
	RetrieveServiceApi: 'update service api',
	UpdateServiceApi: 'update service api'
};

var databaseFilename = path.resolve(__dirname, '../storage/central-database/central-database.json');

// [变量]
var actionMap = {},
	cache = {};

// [流程]
actionMap['create data object'] = onCreateDataObject;
actionMap['retrieve data object'] = onRetrieveDataObject;
actionMap['update data object'] = onUpdateDataObject;
actionMap['delete data object'] = onDeleteDataObject;

load();

// [函数]
function initialize() {
	var req = {
		serviceId: ApiReflection.serviceId,
		action: ApiReflection.UpdateServiceApi
	};

	req.value = {
		serviceId: exports.serviceId,
		name: exports.name
	};

	req.value.api = [];
	for(var action in actionMap) {
		req.value.api.push(action);
	}

	requestOtherService(req);
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
function onCreateDataObject(req, callback) {
	create(createCallback);

	function createCallback(err, dataObjectId) {
		if (err) {
			safeCall(callback, {error: err});
		} else {
			safeCall(callback, {dataObjectId: dataObjectId});
		}
	}
}

function onRetrieveDataObject(req, callback) {
	var dataObjectId,
		dataObject;

	dataObjectId = req.dataObjectId;
	// 检查 dataObjectId 格式等
	// todo

	retrive(dataObjectId, retriveCallback);

	function retriveCallback(err, dataObject) {
		if (err) {
			safeCall(callback, {error: err});
			return;
		}

		var resObj = {
			dataObjectId: dataObjectId,
			dataObject: dataObject
		};

		safeCall(callback, resObj);
	}
}

function onUpdateDataObject(req, callback) {
	var dataObjectId,
		dataObject;

	dataObjectId = req.dataObjectId;
	dataObject = req.dataObject;
	// 检查
	// todo

	update(dataObjectId, dataObject, updateCallback);

	function updateCallback(err) {
		if (err) {
			safeCall(callback, {error: err});
		} else {
			safeCall(callback, {});
		}
	}
}

function onDeleteDataObject(req, callback) {
	var dataObjectId;

	dataObjectId = req.dataObjectId;
	// 检查
	// todo

	_delete(dataObjectId, _deleteCallback);

	function _deleteCallback(err) {
		if (err) {
			safeCall(callback, {error: err});
		} else {
			safeCall(callback, {});
		}
	}
}

// [底层实现]
// # callback(err, dataObjectId)
function create(callback) {
	var id = newId();
	cache[id] = {};

	// 记得保存一下
	save();

	if (callback) callback(undefined, id);

	function newId() {
		// 随机生成一个不冲突的小数作为 id
		while(true) {
			var v = Math.random();
			if (typeof cache[v] === 'undefined') {
				return v;
			}
		}
	}
}

// # callback(err, dataObject)
function retrive(dataObjectId, callback) {
	var dataObject;

	dataObject = cache[dataObjectId];
	if (typeof dataObject === 'object') {
		callback(undefined, dataObject);
	} else {
		callback('data object not found');
	}
}

// # callback(err)
function update(dataObjectId, dataObject, callback) {
	if (typeof dataObject !== 'object') {
		callback("you can only update it to \'object\' type");
		return;
	}

	if (cache[dataObjectId] === undefined) {
		callback('data object not found');
		return;
	}

	cache[dataObjectId] = dataObject;

	// 保存一下
	save();

	callback(undefined);
}

// # callback(err)
function _delete(dataObjectId, callback) {
	if (cache[dataObjectId] === undefined) {
		callback('data object not found');
		return;
	}

	delete cache[dataObjectId];

	// 保存一下
	save();

	callback(undefined);
}

function load() {
	try {
		var str = fs.readFileSync(databaseFilename, {encoding: 'utf8'});
		var o = JSON.parse(str);
		cache = o;
		return true;
	} catch(err) {
		cache = {};
		console.log('load database file failed: \'' + databaseFilename + '\' ' + err.toString());
		return false;
	}
}

function save() {
	try {
		var str = JSON.stringify(cache);
		fs.writeFileSync(databaseFilename, str, {encoding: 'utf8'});
		return true;
	} catch(err) {
		console.log('save database file failed: \'' + databaseFilename + '\' ' + err.toString());
		return false;
	}
}