html
	head
		meta http-equiv=Content-Type Content=text/html;charset=utf-8
		title | Http 学习笔记
		script src=../global/javascript/auto-refresh.js type=text/javascript
		link href=style/style.css rel=stylesheet type=text/css
	body
		div class=main-container
			div class=sub-container
				h3 
					| GENERAL
					span class=redundancy | header
				ul
					li | Cache-Control
					li | Connection
					li | Date
					li | Pragma
					li | Trailer
					li | Transfer-Encoding
					li | Upgrade
					li | Via
					li | Warning
			div class=sub-container
				h3
					| REQUEST
					span class=redundancy | header
				ul
					li | Accept
					li | Accept-Charset
					li | Accept-Encoding
					li | Accept-Language
					li | Authorization
					li | Expect
					li | From
					li | Host
					li | If-Match
					li | If-Modified-Since
					li | If-None-Match
					li | If-Range
					li | If-Unmodified-Since
					li | Max-Forwards
					li | Proxy-Authorization
					li | Range
					li | Referer
					li | TE
					li | User-Agent
			div class=sub-container
				h3
					| RESPONSE
					span class=redundancy | header
				ul
					li | Accept-Ranges
					li | Age
					li | ETag
					li | Location
					li | Proxy-Authenticate
					li | Retry-After
					li | Server
					li | Vary
					li | WWW-Authenticate
			div class=sub-container
				h3
					| ENTITY
					span class=redundancy | header
				ul
					li | Allow
					li | Content-Encoding
					li | Content-Language
					li | Content-Length
					li | Content-Location
					li | Content-MD5
					li | Content-Range
					li | Content-Type
					li | Expires
					li | Last-Modified