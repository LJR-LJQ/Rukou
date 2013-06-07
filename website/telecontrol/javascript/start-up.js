onload = function() {
	addEvents();
	reflesh();
	initUI();
}

// # scb()
function reflesh() {
	var img = document.getElementById('myImage');
	img.src = '../?serviceId=31D21C5B-F786-7138-D2A1-F94328E4DC35';
	img.onload = function() {
		reflesh();
	}
}

function addEvents() {
	var img = document.getElementById('myImage');
	addEvent(img, 'click', onClick, true);
	var wheelUp = document.getElementById('WheelUp');
	addEvent(wheelUp, 'click', onWheelUp, true);
	var DoubleClick = document.getElementById('DoubleClick');
	addEvent(DoubleClick, 'click', onDoubleClick, true);
	var LeftClick = document.getElementById('LeftClick');
	addEvent(LeftClick, 'click', onLeftClick, true);
	var RightClick = document.getElementById('RightClick');
	addEvent(RightClick, 'click', onRightClick, true);
	var LeftDown = document.getElementById('LeftDown');
	addEvent(LeftDown, 'click', onLeftDown, true);
	var WheelDown = document.getElementById('WheelDown');
	addEvent(WheelDown, 'click', onWheelDown, true);
	var LeftUp = document.getElementById('LeftUp');
	addEvent(LeftUp, 'click', onLeftUp, true);

	var container = document.getElementById('myContainer');
	addEvent(container, 'click', onHide, true);
}

function initUI() {
	var wheelUp = document.getElementById('WheelUp');
	wheelUp.style.backgroundImage = "url('./image/wheel-up.png')";
	var DoubleClick = document.getElementById('DoubleClick');
	DoubleClick.style.backgroundImage = "url('./image/double-click.png')";
	var LeftClick = document.getElementById('LeftClick');
	LeftClick.style.backgroundImage = "url('./image/left-click.png')";
	var RightClick = document.getElementById('RightClick');
	RightClick.style.backgroundImage = "url('./image/right-click.png')";
	var LeftDown = document.getElementById('LeftDown');
	LeftDown.style.backgroundImage = "url('./image/left-down.png')";
	var WheelDown = document.getElementById('WheelDown');
	WheelDown.style.backgroundImage = "url('./image/wheel-down.png')";
	var LeftUp = document.getElementById('LeftUp');
	LeftUp.style.backgroundImage = "url('./image/left-up.png')";

	var container = document.getElementById('myContainer');
	var lis = document.getElementsByTagName('li');
	var body = document.getElementsByTagName('body')[0];
	var containerWidth = body.clientWidth / 3;
	var liWidth = parseInt((containerWidth - 6 * 2) / 3) + 'px';
	for(var i = 0; i < lis.length; i++) {
		lis[i].style.width = liWidth;
		lis[i].style.height = liWidth;
	}
	container.style.width = containerWidth + 'px';
	container.style.height = container.style.width;
}