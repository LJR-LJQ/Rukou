html
	head
		title | Rukou 开发人员
		script src=../global/javascript/auto-refresh.js type=text/javascript
	body
		h3 | 开发计划：5月27日-5月31日
		p | Rukou HTTP Server：
		ol
			li | 响应输出时尽可能使用 Content-Length 指明数据长度，避免使用分块编码
			li | 在响应时生成 Server 字段以指明本服务由 Rukou HTTP Server 提供
			li | 在响应时生成 Date 指明响应本身的日期
			li | 在响应时生成 Last-Modified 指明实体最近的一次修改日期
			li | 在响应时生成 ETag 指明实体标记