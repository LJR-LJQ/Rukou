html
	head
		meta http-equiv=Content-Type Content=text/html;charset=utf-8
		title | Action State
		link href=style/style.css rel=stylesheet type=text/css
		link href=style/animation.css rel=stylesheet type=text/css
		script src=../global/javascript/auto-refresh.js type=text/javascript
		script src=../global/javascript/asyncRequest.js type=text/javascript
		script src=../global/javascript/common.js type=text/javascript
		script src=javascript/animation.js type=text/javascript
		script src=javascript/history.js type=text/javascript
		script src=javascript/load-history.js type=text/javascript
		script src=javascript/history-item-visual.js type=text/javascript
		script src=javascript/start-up.js type=text/javascript
	body
		div class=title
			span class=rukou | Rukou
			span class=explain | /explain
		div id=container
			@skipme
				div class=line
					div class=action-item
						span class=seq 
							| 1
						span class=action-name 
							| 创建 HTTP Server
						span class=action-result,success
							| 成功
						span class=ps
							| 开始处理客户端请求
					div class=line
						div class=action-item
							span class=seq 
								| 1
							span class=action-name 
								| 为客户端提供服务
							span class=action-result,progress
								| 进行中
						div class=line
							div class=action-item
								span class=seq 
									| 1
								span class=action-name 
									| 获取客户端请求的 Method
								span class=action-result,success
									| 成功
								span class=ps
									| GET
						div class=line
							div class=action-item
								span class=seq 
									| 2
								span class=action-name 
									| 获取客户端请求的地址
								span class=action-result,success
									| 成功
								span class=ps
									| /file-explorer/index.html
						div class=line
							div class=action-item
								span class=seq 
									| 3
								span class=action-name 
									| 计算出物理路径
								span class=action-result,success
									| 成功
								span class=ps
									| d:\rukou\website\file-explorer\index.html
						div class=line
							div class=action-item
								span class=seq 
									| 4
								span class=action-name 
									| 获取路径所指向的文件的字节长度信息
								span class=action-result,success
									| 成功
								span class=ps
									| 115523403 bytes
						div class=line
							div class=action-item
								span class=seq 
									| 5
								span class=action-name 
									| 向客户端发送文件内容
								span class=action-result,progress
									| 进行中
								span class=ps
									| 23% 已发送，平均速度 44KB/s 已耗时 2min 40s


