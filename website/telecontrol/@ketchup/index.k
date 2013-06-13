html
	head
		title | 远程控制
		@skipme
			script src=../global/javascript/auto-refresh.js type=text/javascript
		script src=../global/javascript/auto-refresh.js type=text/javascript
		link rel=stylesheet href=style/style.css type=text/css
		script src=javascript/common.js
		script src=javascript/event-handler.js type=text/javascript
		script src=javascript/server-api.js type=text/javascript
		script src=javascript/start-up.js type=text/javascript
	body
		div id=myCursor class=cursor
		div id=myContainer class=container x=0 y=0
			ul
				li class=singleline > a id=WheelUp href=javascript: | 上滚
				li > a id=DoubleClick href=javascript: | 双击
				li > a id=LeftClick href=javascript: | 单击
				li > a id=RightClick href=javascript: | 右键
				li > a id=LeftDown href=javascript: | 按下
				li > a id=WheelDown href=javascript: | 下滚
				li > a id=LeftUp href=javascript: | 松开
		img id=myImage


