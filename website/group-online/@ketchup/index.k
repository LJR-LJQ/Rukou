html
	head
		title | Group Online 团队在线
		script src=../global/javascript/auto-refresh.js type=text/javascript
		script src=../global/javascript/ui-model.js type=text/javascript
		script src=javascript/dataMap.js type=text/javascript
		script src=javascript/server.js type=text/javascript
		script src=javascript/data2dom.js type=text/javascript
		script src=javascript/logic.js type=text/javascript
		link href=style/style.css rel=stylesheet type=text/css
	body
		div class=timeline
			div id=message-list class=message-list
				@skipme
					div class=message
						div class=author-face
							img src=image/7dcea149-bf1f-4e7d-b778-df7cb12cc45c.jpg
						div class=message-info
							span class=author-name | 林建入
							span class=message-date | 2013年5月12日 上午11:08:35
						div class=message-content
							p | 文字内容
					div class=message
						div class=author-face
							img src=image/7dcea149-bf1f-4e7d-b778-df7cb12cc45c.jpg
						div class=message-info
							span class=author-name | 林建入
							span class=message-date | 2013年5月12日 上午11:08:35
						div class=message-content
							p | 文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容，文字内容
			div class=editor
				div class=editor-seperator
				div class=author-face
					img id=author-face-image src=image/unknown.jpg
				div class=message-info
					span id=author-name class=author-name | 未知用户
					span id=message-date class=message-date
				form id=message-form
					div class=message-editor-border
						textarea id=message-input class=message-editor placeholder=对话内容...
						button class=send-button | 发送