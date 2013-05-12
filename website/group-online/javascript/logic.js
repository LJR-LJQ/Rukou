var lastMessageId;


var currentAuthorId;
try {
	currentAuthorId = /authorId=([^&]+)/g.exec(window.location.search)[1] || '';
} catch(err) {
	currentAuthorId = '';
}

onload = function() {
	setInterval(pull, 1000);

	id('message-form').onsubmit = function() {
		onSendMessage();
		return false;
	}

	// 设置用户名和头像
	var info = dataMap[currentAuthorId];
	if (info) {
		setAuthorName(info.name);
		setFaceImage(info.face);
	}

	// 启动时间显示
	setInterval(function(){
		var d = new Date();
		var str = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
		setDateTime(str);
	}, 1000);
}

function id(idStr) {
	return document.getElementById(idStr);
}

function onSendMessage() {
	var mi = id('message-input');
	if (!mi.value) {
		return;
	}
	push(mi.value);
	mi.value = '';
}

function pull() {
	var reqObj = new PullObj();
	reqObj.lastMessageId = lastMessageId;

	request(reqObj, pullCallback)

	function pullCallback(resObj) {
		if (resObj.error) {
			console.log(resObj.error);
			return;
		}

		appendMessageList(resObj.messageList);

		if (resObj.messageList.length > 0) {
			// 滚动到底部
			id('message-form').scrollIntoView();
		}
	}
}

function push(content) {
	var reqObj = new PushObj();
	reqObj.authorId = currentAuthorId;
	reqObj.content = content;

	request(reqObj, undefined);
}

function appendMessageList(messageList) {
	if (!messageList || messageList.length < 1) return;
	// 记录下最新的 messageId
	lastMessageId = messageList[messageList.length-1].messageId;
	// 写入到页面
	messageList.forEach(function(message) {
		var messageDom = messageDomFrom(message);
		append2MessageList(messageDom);
	});

	function append2MessageList(messageDom) {
		if (!messageDom) return;
		var d = id('message-list');
		if (d) {
			d.appendChild(messageDom);
			// 启动动画
			setTimeout(function() {
				messageDom.classList.add('show');
			}, 1);
		}
	}
}

function setAuthorName(name) {
	id('author-name').textContent = name;
}

function setFaceImage(url) {
	id('author-face-image').setAttribute('src', url);
}

function setDateTime(str) {
	id('message-date').textContent = str;
}