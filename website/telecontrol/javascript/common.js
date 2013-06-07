// 选取满足CSS Selector表达式的元素
// # successCallback(elementList)
function selectAll(selector, successCallback) {
	successCallback = emptyProtect(successCallback);
	try {
		var result = document.querySelectorAll(selector);
		if (result && result.length > 0) {
			var arrary = [];
			for (var i = 0, len = result.length; i < len; ++i) {
				arrary.push(result[i]);
			}
			successCallback(arrary);
		}
	} catch (err) {
		log(err.toString());
	}
}

// 选取满足CSS Selector表达式的元素
// # successCallback()
function addListenerOn(selector, eventName, listener, successCallback) {
	successCallback = emptyProtect(successCallback);
	selectAll(selector, selectAllCallback);

	function selectAllCallback(elements) {
		for (var i = 0, len = elements.length; i < len; ++i) {
			elements[i].addEventListener(eventName, listener);
		}
		successCallback();
	}
}

// # successCallback()
function appendChildren(element, children, successCallback) {
	if (!element) return;
	successCallback = emptyProtect(successCallback);

	if (!children) {
		successCallback();
		return;
	}

	for (var i = 0, len = children.length; i < len; ++i) {
		element.appendChild(children[i]);
	}

	successCallback();
}

// # successCallback()
function removeChildren(element, successCallback) {
	if (!element) return;
	successCallback = emptyProtect(successCallback);
	while(element.firstChild) {
		element.removeChild(element.firstChild);
	}
	successCallback();

	// 删除元素上的事件监听器和数据引用等
	// 避免内存泄露
	function cleanElement() {
		// TODO
	}
}

function emptyProtect(func) {
	return typeof func === 'function' ? func : emptyFunc;
}

function emptyFunc() {
	log('empty func invoked');
}

function log() {
	if (console && typeof console.log === 'function') {
		console.log.apply(console, arguments);
	}
}

function getMousePoint(evt) {  
    // 定义鼠标在视窗中的位置  
    var point = {  
        x:0,  
        y:0  
    };  
   
    // 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离  
    if(typeof window.pageYOffset != 'undefined') {  
        point.x = window.pageXOffset;  
        point.y = window.pageYOffset;  
    }  
    // 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离  
    // IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat  
    else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {  
        point.x = document.documentElement.scrollLeft;  
        point.y = document.documentElement.scrollTop;  
    }  
    // 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度  
    else if(typeof document.body != 'undefined') {  
        point.x = document.body.scrollLeft;  
        point.y = document.body.scrollTop;  
    }  
   
    // 加上鼠标在视窗中的位置  
    point.x += evt.clientX;  
    point.y += evt.clientY;  
   
    // 返回鼠标在视窗中的位置  
    return point;  
}

function addEvent(obj, evt, func, useCapture) {
	if (obj.attachEvent) {
		//if IE (and Opera depending on user setting)
		obj.attachEvent("on" + evt, func, useCapture);
	} else if (obj.addEventListener) {
		//WC3 browsers
		obj.addEventListener(evt, func, useCapture);
	}
}