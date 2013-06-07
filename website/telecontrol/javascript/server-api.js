// 依赖：common.js

function printScreen(scb, fcb) {
	var reqObj = {
		serviceId: '31D21C5B-F786-7138-D2A1-F94328E4DC35',
		action: 'print screen'
	};
	asyncRequest(reqObj, asyncRequestScb, asyncRequestFcb);

	function asyncRequestScb(resObj) {
		if (typeof resObj.error === 'undefined') {
			scb(resObj);
		} else {
			fcb(resObj.error);
		}
	}

	function asyncRequestFcb(err) {
		fcb(err);
	}
}

function controlScreen(evt) {
	var reqObj = {
		serviceId: '31D21C5B-F786-7138-D2A1-F94328E4DC35',
		action: 'control screen',
		evt: evt
	};
	asyncRequest(reqObj, asyncRequestScb, asyncRequestFcb);

	function asyncRequestScb(resObj) {
	}

	function asyncRequestFcb(err) {
	}
}

// # scb(resObj)
function asyncRequest(reqObj, scb, fcb) {
	scb = emptyProtect(scb);

	var xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open('POST', document.location.pathname, true);
	xmlHttpReq.setRequestHeader('content-type', 'application/json;charset=utf-8');
	xmlHttpReq.onreadystatechange = function() {
		if (xmlHttpReq.readyState !== 4) return;
		if (xmlHttpReq.status === 200) {
			// 将结果解析出来，并调用回调函数进行通知
			try {
				var resObj = JSON.parse(xmlHttpReq.responseText);
				scb(resObj);
			} catch(err) {
				fcb(err);
			}
		}
	};
	xmlHttpReq.send(JSON.stringify(reqObj));
}