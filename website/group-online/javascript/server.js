var isPulling = false;

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

	// 不能重叠发送 pull 请求
	if (reqObj.action === 'pull') {
		if (isPulling) {
			return;
		}
		isPulling = true;
		asyncRequest(reqObj, resCallback, function() {
			isPulling = false;
		});
	} else {
		// push 请求随意重叠
		asyncRequest(reqObj, resCallback);
	}

}


function asyncRequest(reqObj, callback, finalCallback) {
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

		if (finalCallback) {
			finalCallback();
		}
	};
	xmlHttpReq.send(JSON.stringify(reqObj));
}