var request = require('../cmd/lib/request.js').request;

var argv = process.argv;
if (argv.length < 4 || argv.length > 5 || 
	(argv.length === 5 && argv[1].toLowerCase() !== 'debug')) {
	showUsage();
	return;
}

push(argv[argv.length-2], argv[argv.length-1]);

function push(authorId, content) {
	var req = {
		serviceId: '073b3984-58e5-4277-bde3-ab8081c88022',
		action: 'push',
		authorId: authorId,
		content: content
	};

	request(req, requestCallback);

	function requestCallback(resObj) {
		if (resObj.error) {
			console.log(resObj.error);
		} else {
			console.log('push done.');
		}
	}
}

function showUsage() {
	console.log('node [debug] push.js <authorId> <content>');
}