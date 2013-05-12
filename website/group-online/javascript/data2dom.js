var dataMap = {
	'7dcea149-bf1f-4e7d-b778-df7cb12cc45c': {
		name: '林建入',
		face: 'image/7dcea149-bf1f-4e7d-b778-df7cb12cc45c.jpg'
	},
	'24906a68-0702-4f27-aeb1-03713bf0f9be': {
		name: '刘锦权',
		face: 'image/24906a68-0702-4f27-aeb1-03713bf0f9be.jpg'
	}
}

function messageDomFrom(data) {
	if (!data) return;
	var messageDom = E('div', AddClass('message'), AppendChildren(
		E('div', AddClass('author-face'), AppendChildren(
			E('img', SetAttribute('src', authorFace()))
		)),

		E('div', AddClass('message-info'), AppendChildren(
			E('span', AddClass('author-name'), SetTextContent(authorName())),
			E('span', AddClass('message-date'), SetTextContent(messageDate()))
		)),

		E('div', AddClass('message-content'), SetTextContent(messageContent()))
	));

	return messageDom;

	function authorFace() {
		var d = dataMap[data.authorId];
		if (!d) {
			return 'image/unknown.jpg';
		} else {
			return d.face;
		}
	}

	function authorName() {
		var d = dataMap[data.authorId];
		if (!d) {
			return '未知用户';
		} else {
			return d.name;
		}
	}
	
	function messageDate() {
		return '2013/5/11 15:20';
	}

	function messageContent() {
		return data.content;
	}
}