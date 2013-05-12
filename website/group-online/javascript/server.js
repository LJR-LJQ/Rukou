var requesting = false;

function PushObj() {
	this.serviceId= '073b3984-58e5-4277-bde3-ab8081c88022';
	this.action = 'push';
	return this;
}

function PullObj() {
	this.serviceId= '073b3984-58e5-4277-bde3-ab8081c88022';
	this.action = 'pull';
	return this;
}

function request(reqObj, resCallback) {
	if (!resCallback) {
		resCallback = function(resObj) {};
	}

	asyncRequest(reqObj, resCallback);
}


function asyncRequest(reqObj, callback) {
	// 如果当前有请求尚未完成，则不再发送新的请求
	if (requesting) return;
	requesting = true;

	var xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open('POST', document.location.pathname, true);
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

		// 无论是否发生了错误，至此请求完成
		requesting = false;
	};
	xmlHttpReq.send(JSON.stringify(reqObj));
}