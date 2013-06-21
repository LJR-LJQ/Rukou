
// # scb(history)
function loadHistoryLoop(scb) {
	var startIndex = 0,
		maxLength = 100;

	load(onLoadOk, onLoadFailed);

	function onLoadOk(history) {
		if (scb) {
			scb(history);
		}
		// 继续尝试加载
		setTimeout(function() {
			load(onLoadOk, onLoadFailed);
		}, 250);
	}

	function onLoadFailed() {
		// 继续尝试加载
		setTimeout(function() {
			load(onLoadOk, onLoadFailed);
		}, 250);
	}

	// # scb(history)
	function load(scb, fcb) {
		var reqObj = {
			serviceId: 'f6171814-5138-45b0-8ab4-962376bcd9ef',
			action: 'retrive history',
			historyId: 0,
			startIndex: startIndex,
			maxLength: maxLength
		};

		asyncRequest(reqObj, function(resObj) {
			if (resObj.error) return;

			if (scb) {
				startIndex += resObj.history.length;
				scb(resObj.history);
			}
		});
	}
}