
// 欢迎屏幕动画
function showWelcomeScreen(finishCallback) {
	var captionsContainer,
		captionsList,
		tmpList;

	captionsContainer = document.getElementById('captions-container');
	if (!captionsContainer) return;

	captionsList = captionsContainer.childNodes;
	if (!captionsList || captionsList.length <= 0) return;

	tmpList = [];
	for (var i = 0; i < captionsList.length; ++i) {
		tmpList.push(captionsList[i]);
	}
	captionsList = tmpList;

	captionsList = captionsList.filter(function(caption) {
		// 必须在 class 属性中含有 caption
		if (!caption.classList) return;
		for (var j = 0; j < caption.classList.length; ++j) {
			if (caption.classList[j] === 'caption') return true;
		}
		return false;
	});

	runCaptions(captionsList, runCaptionsCallback);

	function runCaptionsCallback() {
		// 把欢迎屏幕渐隐掉，然后通知外部整个欢迎动画已经完全结束
		var welcomeScreen;

		welcomeScreen = document.getElementById('welcome-screen');
		if (!welcomeScreen) {
			if (finishCallback) {
				try {
					finishCallback();
				} catch(err) {

				}
			}
			return;
		}

		welcomeScreen.classList.remove('welcome-screen-show');

		if (finishCallback) {
			try {
				finishCallback();
			} catch(err) {

			}
		}
	}

	// 字幕切换动画
	function runCaptions(captionList, allDoneCallback) {
		if (!captionList || captionList.length <= 0) return;
		var i = 0;
		showCaption(captionList[i++], showCaptionCallback);

		function showCaption(caption, finishCallback) {
			if (!caption) {
				// 直接返回，什么也不做
				// 不调用 finishCallback
				return;
			}
			caption.classList.add('caption-show');
			// 动画间隔后调用回调函数
			if (finishCallback) {
				caption.addEventListener('webkitAnimationEnd', function(e) {
					try {
						finishCallback();
					} catch(err) {

					}
				});
			}
		}

		function showCaptionCallback() {
			console.log(i);
			if (i >= captionList.length) {
				// 全部结束了
				if (allDoneCallback) {
					try {
						allDoneCallback();
					} catch (err) {

					}
				}
				return;
			}
			showCaption(captionList[i++], showCaptionCallback);
		}
	}
}

// 主界面动画
function logoArea() {
	return document.getElementById('logo-area');
}

function title() {
	return document.getElementById('title');
}

function websiteList() {
	return document.getElementById('website-list');
}

function show(e) {
	if (!e) return;
	e.classList.add('show');
}

function onloadHandler() {
	showWelcomeScreen(showWelcomeScreenDoneCallback);
	//showWelcomeScreenDoneCallback();
	function showWelcomeScreenDoneCallback() {
		show(logoArea());
		show(title());
		show(websiteList());
	}
}