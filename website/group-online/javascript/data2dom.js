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
		try {
			var d = new Date(data.dateTime);
			var str = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
			return str;
		} catch(err) {
			return '未知时间';
		}
		return '2013/5/11 15:20';
	}

	function messageContent() {
		return data.content;
	}
}