(function() {
	var currentMtime,
		working;

	// 记录下页面的当前时间
	currentMtime = Date.now();
	working = false;

	requestMtime(function(resObj) {
		if (resObj.error) return;
		currentMtime = Date.parse(resObj.mtime);
		// 每隔 0.5 秒刷新一次页面
		setInterval(checkAndRefresh, 500);
	});

	function requestMtime(callback) {
		// 如果当前有请求尚未完成，则不再发送新的请求
		if (working) return;
		working = true;

		var pathname = document.location.pathname;

		var xmlHttpReq = new XMLHttpRequest();
		var req = {
			serviceId: 'b0ae2e86-a1b6-4e9d-a245-0173e6e8b857',
			action: 'retrive mtime',
			path: document.location.pathname
		};
		xmlHttpReq.open('POST', pathname, true);
		xmlHttpReq.setRequestHeader('content-type', 'application/json;charset=utf-8');
		xmlHttpReq.onreadystatechange = function() {
			if (xmlHttpReq.readyState !== 4) return;
			if (xmlHttpReq.status === 200) {
				// 将结果解析出来，并调用回调函数进行通知
				try {
					var obj = JSON.parse(xmlHttpReq.responseText);
					callback(obj);
				} catch(err) {

				}
			}

			// 请求完成
			working = false;
		};
		xmlHttpReq.send(JSON.stringify(req));
	}

	function checkAndRefresh() {
		// 从服务器获取最新的修改时间，并比对当前记录的时间
		// 如果服务器的时间值更大，则在当前页面上强制进行刷新
		requestMtime(function(resObj) {
			var newMtime = Date.parse(resObj.mtime);
			if (newMtime > currentMtime) {
				// 强制从服务器获取新页面，而不是缓存中
				location.reload(true);
			}
		});
	}
})();