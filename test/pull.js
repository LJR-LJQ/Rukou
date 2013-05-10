var request = require('../cmd/lib/request.js').request;

var lastMessageId = false;

pullOnce(finishCallback);

function pullOnce(finishCallback) {
	var req = {
		serviceId: '073b3984-58e5-4277-bde3-ab8081c88022',
		action: 'pull',
		lastMessageId: lastMessageId
	};

	request(req, requestCallback);

	function requestCallback(resObj) {
		if (resObj.error) {
			console.log(resObj.error);
		} else {
			// 记录下最新的 id
			var messageList = resObj.messageList;
			if (messageList.length > 0) {
				lastMessageId = messageList[messageList.length - 1].messageId;
			}

			// 输出消息
			messageList.forEach(function(message) {
				console.log(message.messageId);
			});
		}

		if (finishCallback) {
			finishCallback();
		}
	}
}

function finishCallback() {
	pullOnce(finishCallback);
}