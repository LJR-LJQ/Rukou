// 依赖：common.js

// # scb(domElement)
function parentDirList(scb) {
	scb = emptyProtect(scb);
	selectAll('.parent-dir-list', function(list) {
		scb(list[0]);
	});
}

// # scb(domElement)
function subDirList(scb) {
	scb = emptyProtect(scb);
	selectAll('.sub-dir-list', function(list) {
		scb(list[0]);
	});
}

// # scb(domElement)
function fileList(scb) {
	scb = emptyProtect(scb);
	selectAll('.file-list', function(list) {
		scb(list[0]);
	});
}