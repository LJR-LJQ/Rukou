var cache = [];

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

	if (reqObj.action === 'pull') {
		if (cache.length > 0) {
			resCallback({
				messageList: cache
			});
			cache = [];
		} else {
			resCallback({messageList: []});
			return;
			resCallback({
				messageList: [{
					messageId: '-1',
					authorId: '24906a68-0702-4f27-aeb1-03713bf0f9be',
					content: '测试内容 测试内容 测试内容 测试内容 测试内容 ',
					dateTime: new Date()
				}]
			});
		}
	} else if (reqObj.action === 'push') {
		try {
			var o = {
				messageId: '-1',
				authorId: reqObj.authorId,
				content: reqObj.content,
				dateTime: ''
			};
			cache.push(o);
			resCallback({});
		} catch(err) {
			console.log(err);
		}
	}
}