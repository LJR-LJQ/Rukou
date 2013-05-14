var url = require('url'),
	http = require('http');

// 不停的请求服务器下的文件，测试其内存泄露情况
var targetUrl = 'http://121.199.4.39/global/font/fys.ttf';

for (var i = 0; i < 1000; ++i) {
	requestIt(i, targetUrl);
}

function requestIt(i, targetUrl) {
	if (!targetUrl) return;
	var req = http.request(targetUrl);

	req.on('error', onError);
	req.on('response', onResponse);
	req.end();

	function onError(err) {
		console.log(err.toString());
	}

	function onResponse(res) {
		console.log('res');
		res.on('data', function(data) {
			log(data.length + 'bytes');
		});

		res.on('end', function() {
			log('end');
		})
	}

	function log(str) {
		console.log('[' + i + '] ' + str);
	}
}