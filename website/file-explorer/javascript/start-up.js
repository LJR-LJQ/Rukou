var ProductName = 'FileJump';

onload = function() {
	headerSwitchButton(function(e) {
		e.addEventListener('click', onClickHeaderSwitchButton);
	});

	gotoDir('');
}

var seqNum = 0;

// # scb()
function gotoDir(path, scb) {
	var _seqNum = ++seqNum;

	scb = emptyProtect();
	queryDir(path, queryDirCallback);

	function queryDirCallback(dirInfo) {
		if (_seqNum !== seqNum) {
			return;
		}
		setParentDirList(dirInfo.parentDirList);
		setSubDirList(dirInfo.subDirList);
		setFileList(dirInfo.fileList);
	}

	function setParentDirList(list, scb) {
		parentDirList(function(targetDom) {
			setDataList2Dom(targetDom, list, d2d_parentDir, scb);
		});
	}

	function setSubDirList(list, scb) {
		subDirList(function(targetDom) {
			setDataList2Dom(targetDom, list, d2d_subDir, scb);
		});
	}

	function setFileList(list, scb) {
		fileList(function(targetDom) {
			setDataList2Dom(targetDom, list, d2d_file, scb);
		});
	}
}