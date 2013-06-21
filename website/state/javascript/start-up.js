var cache = [{
	historyItem: {
		path: ''
	},
	historyItemVisual: {
		eLine: undefined
	},
	childrenLength: 0
}];

onload = function() {
	var container = document.getElementById('container');
	cache[0].historyItemVisual.eLine = container;

	loadHistoryLoop(onLoadMore);

	function onLoadMore(historySegment) {

		replayHistory(historySegment, representIt);

		function representIt(historyItem) {
			if (!historyItem) return;

			// 查找是否有相同 path 的元素存在
			var cacheItem;
			for (var i = 0, len = cache.length; i < len; ++i) {
				if (cache[i].historyItem.path === historyItem.path) {
					cacheItem = cache[i];
					break;
				}
			}

			if (!cacheItem) {
				// 创建新的 cacheItem 
				HistoryItemVisual(function(historyItemVisual) {
					// 创建并添加到列表
					cacheItem = {
						historyItem: historyItem,
						historyItemVisual: historyItemVisual,
						childrenLength: 0
					};
					cache.push(cacheItem);

					// 查找父元素
					findParentCacheItem(cacheItem, function(parentCacheItem) {
						// 计算 seq
						++parentCacheItem.childrenLength;
						hiv.seq(historyItemVisual, String(parentCacheItem.childrenLength));
						

						// 添加到界面上
						var parentELine = parentCacheItem.historyItemVisual.eLine,
							currentELine = cacheItem.historyItemVisual.eLine;
						parentELine.appendChild(currentELine);

						// 执行动画显示
						animationShow(currentELine);

						// 执行更新操作
						update();
					});
				});
			} else {
				update();
			}

			function update() {
				// 更新 cacheItem
				var historyItemVisual = cacheItem.historyItemVisual;
				hiv.actionName(historyItemVisual, historyItem.actionName);
				hiv.actionStatus(historyItemVisual, historyItem.actionStatus);
				hiv.ps(historyItemVisual, historyItem.ps);
			}
			

			function findParentCacheItem(cacheItem, scb) {
				if (!cacheItem) return;
				scb = scb || function(){};
				var parentPath = getParentPath(cacheItem.historyItem.path),
					parentCacheItem;
				for (var i = 0, len = cache.length; i < len; ++i) {
					if (cache[i].historyItem.path === parentPath) {
						parentCacheItem = cache[i];
						break;
					}
				}
				if (parentCacheItem) {
					scb(parentCacheItem);
				}

				function getParentPath(path) {
					var i = path.lastIndexOf('/');
					return path.substring(0, i);
				}
			}
		}
	}
}

function replayHistory(history, popCb) {
	if (!history) return;
	var c = 0;
	history.forEach(function(historyItem) {
		c += 100;
		setTimeout(function(){
			popCb(historyItem);
		}, c);
	});
}

function createNode(o, scb) {
	scb = scb || function(){};

	seqSpan.textContent = o.seq;
	actionNameSpan.textContent = o.actionName;
	actionResultSpan.textContent = o.actionResult;
	psSpan.textContent = o.ps;
}

function actionName(o, v) {
	o.eActionName.textContent = v;
}

function actionResult(o, v) {
	o.eActionResult.textContent = v;
}
