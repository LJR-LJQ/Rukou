html
	head
		meta http-equiv=Content-Type Content=text/html;charset=utf-8
		title | @Rukou 入口
		script src=../global/javascript/auto-refresh.js type=text/javascript
		script src=javascript/ui.js type=text/javascript
		link href=style/style.css rel=stylesheet type=text/css
	body class=base-bg,read-color onload=onloadHandler();
		div id=welcome-screen class=welcome-screen,welcome-screen-hide,welcome-screen-show
			div class=top-space
			div id=captions-container class=captions-container
				@skipme
					div class=caption,caption-hide
						div class=welcome-words | 欢迎使用由“小林软件”提供的
				div class=caption,caption-hide
					div class=product-name | @Rukou 入口
					div class=slogan | 痛苦和骄傲我共你一起拥有
		div id=logo-area class=logo-area,hide-0
			a href=javascript: target=_blank
				div class=logo | @Rukou 入口
		div id=title class=title,hide-1 | 网站列表
		div id=website-list class=website-list,hide-2
			ul
				li
					div class=website-name
						a href=/file-explorer/index.html target=_blank | 文件浏览器
					div class=website-desc
						| 浏览当前计算机上的文件并进行下载
				li
					div class=website-name
						a href=/group-online/index.html target=_blank | 团队在线
					div class=website-desc
						| 提供了团队沟通和协作所需的在线交流系统
				li
					div class=website-name
						a href=/developer/index.html target=_blank | 开发信息
					div class=website-desc
						| 包括开发计划，开发进展，开发文档以及一些技术总结等
				li
					div class=website-name
						a href=/http-learn/index.html target=_blank | HTTP 协议学习笔记
					div class=website-desc
						| 主要是 HTTP 学习方面的一些个人总结
