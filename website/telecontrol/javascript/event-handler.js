function onClick(evt) {
	console.log('onClick');
	evt = evt ? evt : window.event;
	var container = document.getElementById('myContainer');
	var cursor = document.getElementById('myCursor');
	var display = window.getComputedStyle ? window.getComputedStyle(container, null).display : container.currentStyle["display"];
	if(display == 'none') {
		var point = getMousePoint(evt);
		controlScreen([
			'Move',
			point.x,
			point.y
		]);
		cursor.style.display = 'block';
		cursor.style.left = point.x - cursor.offsetWidth / 2 + 'px';
		cursor.style.top = point.y - cursor.offsetHeight / 2 + 'px';

		container.setAttribute('x', point.x);
		container.setAttribute('y', point.y);
		container.style.display = 'block';
		point.x -= container.offsetWidth / 2;
		point.y -= container.offsetHeight / 2;
		if(point.x < 0) {
			point.x = 0;
		} else if(point.x + container.offsetWidth > this.width) {
			point.x = this.width - container.offsetWidth;
		}
		if(point.y < 0) {
			point.y = 0;
		} else if(point.y + container.offsetHeight > this.height) {
			point.y = this.height - container.offsetHeight;
		}
		container.style.left = point.x + 'px';
		container.style.top = point.y + 'px';
	} else {
		container.style.display = 'none'
		cursor.style.display = 'none';
	}
}

function onHide() {
	var container = document.getElementById('myContainer');
	var cursor = document.getElementById('myCursor');
	container.style.display = 'none'
	cursor.style.display = 'none';

}

function onLeftClick(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'LeftClick'
	]);
}

function onRightClick(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'RightClick'
	]);
}

function onDoubleClick(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'DoubleClick'
	]);
}

function onLeftDown(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'LeftDown'
	]);
}

function onLeftUp(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'LeftUp'
	]);
}

function onWheelUp(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'Wheel',
		120
	]);
}

function onWheelDown(evt) {
	var container = document.getElementById('myContainer');
	controlScreen([
		'Wheel',
		-120
	]);
}