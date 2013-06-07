// [导出]
exports.name = 'Tele Control';
exports.serviceId = '31D21C5B-F786-7138-D2A1-F94328E4DC35';
exports.serveIt = serveIt;
exports.requestOtherService = requestOtherService;
exports.initialize = initialize;
exports.responseUrl = responseUrl;

// [模块]
var fs = require('fs'),
	url = require('url'),
	path = require('path'),
	stream = require('stream'),
	execFile = require('child_process').execFile;

// [变量]
var actionMap = {};
var printScreenExe = path.resolve(__dirname, '../bin/PrintScreen.exe');
var controlScreenExe = path.resolve(__dirname, '../bin/ControlScreen.exe');
var image;

// [流程]
actionMap['control screen'] = onControlScreen;

// [函数]
function initialize() {
	printScreen();
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

function responseUrl(_rawReq, _rawRes) {
	_rawRes.setHeader('Content-Type', 'image/png');
	_rawRes.setHeader('Content-Length', image.length)
	_rawRes.setHeader('Connection', 'Close')
	_rawRes.write(image);
}

function requestOtherService(req, callback) {
	safeCall(callback, {error: 'service not found'});
}

function printScreen() {
	var imagePath = path.resolve(__dirname, 'desktop.png');
	execFile(printScreenExe, [imagePath], {}, execFileCallback);

	function execFileCallback(error, stdout, stderr) {
		image = fs.readFileSync(imagePath);
		printScreen();
	}
}

function onControlScreen(req, callback) {
	execFile(controlScreenExe, req.evt, {}, execFileCallback);

	function execFileCallback(error, stdout, stderr) {
		callback(stdout);
	}
}