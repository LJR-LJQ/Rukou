(function() {
	// 用于异步请求的方法
	var reqAPI = function(cb) {
		var xmlHttpReq = new XMLHttpRequest();
		var req = {
			path: document.location.pathname
		};
		xmlHttpReq.open('POST', '/mtime', true);
		xmlHttpReq.onreadystatechange = function() {
			if (xmlHttpReq.readyState != 4) return;
			if (xmlHttpReq.status != 200) return;
			// 将结果解析出来，并调用回调函数进行通知
			var obj = JSON.parse(xmlHttpReq.responseText);
			var v = Date.parse(obj.mtime);
			cb(v);
		};
		xmlHttpReq.send(JSON.stringify(req));
	};

	// 用于刷新页面的方法
	var refreshPage = function() {
		// 从服务器获取最新的修改时间，并比对当前记录的时间
		// 如果服务器的时间值更大，则在当前页面上强制进行刷新
		reqAPI(function(newMtime) {
			if (newMtime > pageMtime) {
				// 强制从服务器获取新页面，而不是缓存中
				location.reload(true);
			}
		});
	}

	// 记录下页面的当前时间
	var pageMtime = Date.now();
	pageMtime = reqAPI(function(mtime) {
		pageMtime = mtime;
		// 每隔 0.5 秒刷新一次页面
		setInterval(refreshPage, 500);
	});

})();